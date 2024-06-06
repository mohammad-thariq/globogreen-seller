import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { deliveryManTableHeading } from "@/constant/tableHeading";
import { DeliveryManAPI } from "@/service/deliveryMan/DeliveryManAPI";
import { DeliveryManForm } from "@/common/Form/DeliveryManForm/DeliveryManForm";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";

export const DeliveryMan = () => {
  const {
    deliveryMan,
    createDeliveryMan,
    updateDeliveryMan,
    deleteDeliveryMan,
  } = new DeliveryManAPI();
  const [currentDeliveryManId, setCurrentDeliveryManId] = useState(null);
  const [currentDeliveryManData, setCurrentDeliveryManData] = useState(null);
  const { data,isLoading, refetch } = useQuery(["deliveryMan"], deliveryMan);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  console.log(data, "deliveryMan Data");

  const {
    mutate: createDeliveryManMutate,
    isLoading: createDeliveryManLoading,
  } = useMutation(createDeliveryMan, {
    onSuccess: (data, variables, context) => {
      setOpenCreatePopup(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenCreatePopup(true);
      refetch();
      ToastifyFailed(data?.notification);
    },
  });

  const {
    mutate: updateDeliveryManMutate,
    isLoading: updateDeliveryManLoading,
  } = useMutation(updateDeliveryMan, {
    onSuccess: (data, variables, context) => {
      setOpenUpdatePopup(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenUpdatePopup(true);
      ToastifyFailed(data?.notification);
    },
  });

  const {
    mutate: DeleteDeliveryManMutate,
    isLoading: deleteDeliveryManLoading,
  } = useMutation(deleteDeliveryMan, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.messege);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.messege);
    },
  });

  const handleCreateDeliveryMan = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateDeliveryMan = (id) => {
    setCurrentDeliveryManId(id);
    const getCurrentDeliveryMan = data?.deliveryMans?.find((i) => i?.id === id);
    console.log(getCurrentDeliveryMan);
    setCurrentDeliveryManData(getCurrentDeliveryMan);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteDeliveryMan = (id) => {
    setCurrentDeliveryManId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteDeliveryMan = () => {
    DeleteDeliveryManMutate({ id: currentDeliveryManId });
  };

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <>
      <Breadcrumb currentPage={"Delivery Man"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateDeliveryMan}
        />
      </div>
      <BaseTable
        tableHeadings={deliveryManTableHeading}
        onDeliveryManData={data}
        onDelete={handleDeleteDeliveryMan}
        onUpdate={handleUpdateDeliveryMan}
      />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateDeliveryMan}>
          <DeliveryManForm
            button="ADD"
            onClose={handleCreateDeliveryMan}
            onSave={createDeliveryManMutate}
            loading={createDeliveryManLoading}
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateDeliveryMan}>
          <DeliveryManForm
            currentDeliveryManId={currentDeliveryManId}
            onClose={handleUpdateDeliveryMan}
            button="Update"
            data={currentDeliveryManData}
            onUpdate={updateDeliveryManMutate}
            loading={updateDeliveryManLoading}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteDeliveryMan}>
          <DeleteItem
            onClose={handleDeleteDeliveryMan}
            onClick={handleOnDeleteDeliveryMan}
            loading={deleteDeliveryManLoading}
          />
        </Popup>
      )}
    </>
  );
};
