import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { ServiceForm } from "@/common/Form/ManageWebsitesForm/ServiceForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { serviceTableHeading } from "@/constant/tableHeading";
import { ManageWebsitesAPI } from "@/service/manageWebsites/ManageWebsitesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const Service = () => {
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [currentServiceData, setCurrentServiceData] = useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false); 

  const { service, createService, UpdateService, deleteService } =
    new ManageWebsitesAPI();
  const { data, isLoading, refetch } = useQuery(["service"], service);
  console.log(data, "Slider data");

  const { mutate: createServiceMutate, isLoading: createServiceLoading } =
    useMutation(createService, {
      onSuccess: (data, variables, context) => {
        setOpenCreatePopup(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenCreatePopup(true);
        refetch();
        ToastifyFailed(data?.message);
      },
    });

  const { mutate: updateServiceMutate, isLoading: updateServiceLoading } =
    useMutation(UpdateService, {
      onSuccess: (data, variables, context) => {
        setOpenUpdatePopup(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenUpdatePopup(true);
        ToastifyFailed(data?.notification);
        refetch();
      },
    });

  const { mutate: DeleteServiceMutate, isLoading: deleteServiceLoading } =
    useMutation(deleteService, {
      onSuccess: (data, variables, context) => {
        setOpenDeletePopup(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenDeletePopup(true);
        ToastifyFailed(data?.message);
      },
    });

  const handleCreateService = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateService = (id) => {
    setCurrentServiceId(id);
    setOpenUpdatePopup(!openUpdatePopup);
    const getCurrentService = data?.services?.find((i) => i?.id === id);
    setCurrentServiceData(getCurrentService);
    console.log(getCurrentService, "getCurrentService")
  };

  const handleDeleteService = (id) => {
    setOpenDeletePopup(!openDeletePopup);
    setCurrentServiceId(id);
  };

  const handleOnDeleteService = () => {
    DeleteServiceMutate({ id: currentServiceId });
  };
  return (
    <>
      <PageHeader title="Service" />
      <Breadcrumb currentPage={"Service"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateService}
        />
      </div>
      <BaseTable tableHeadings={serviceTableHeading} onServiceData={data} onDelete={handleDeleteService} onUpdate={handleUpdateService}/>
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateService}>
          <ServiceForm
            onClose={handleCreateService}
            button="Add"
            onSave={createServiceMutate}
            loading={createServiceLoading}
          />
        </Popup>
      )}
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateService}>
          <ServiceForm
            onClose={handleUpdateService}
            currentServiceId={currentServiceId}
            button="Update"
            data={currentServiceData}
            onUpdate={updateServiceMutate}
            loading={updateServiceLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteService}>
          <DeleteItem
            onClose={handleDeleteService}
            onClick={handleOnDeleteService}
            loading={deleteServiceLoading}
          />
        </Popup>
      )}
    </>
  );
};
