import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { locationAPI } from "@/service/location/loctionAPI";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { StateForm } from "@/common/Form/LocationForm/StateForm";
import { StateTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";

export const State = () => {
  const {
    country,
    state,
    createStateLocation,
    updateStateLocation,
    deleteStateLocation,
  } = new locationAPI();
  const { data, isLoading, refetch } = useQuery(["state"], state);
  const { data: countryData } = useQuery(["country"], country);
  const [currentStateId, setCurrentStateId] = useState(null);
  const [currentStateData, setCurrentStateData] = useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { mutate: createStateMutate, isLoading: createStateLoading } =
    useMutation(createStateLocation, {
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

  const { mutate: updateStateMutate, isLoading: updateStateLoading } =
    useMutation(updateStateLocation, {
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

  const { mutate: DeleteStateMutate, isLoading: deleteStateLoading } =
    useMutation(deleteStateLocation, {
      onSuccess: (data, variables, context) => {
        setOpenDeletePopup(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenDeletePopup(true);
        ToastifyFailed(data?.notification);
        refetch();
      },
    });

  const handleCreateLocation = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateLocation = (id) => {
    setCurrentStateId(id);
    const getCurrentState = data?.states?.find((i) => i?.id === id);
    setCurrentStateData(getCurrentState);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteLocation = (id) => {
    setCurrentStateId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteLocation = () => {
    DeleteStateMutate({ id: currentStateId });
  };

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"State"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateLocation}
        />
      </div>
      <BaseTable
        tableHeadings={StateTableHeading}
        onStateData={data}
        onDelete={handleDeleteLocation}
        onUpdate={handleUpdateLocation}
      />

      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateLocation}>
          <StateForm
            getCountry={countryData}
            onClose={handleCreateLocation}
            button="Add"
            onSave={createStateMutate}
            loading={createStateLoading}
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateLocation}>
          <StateForm
            getCountry={countryData}
            currentStateId={currentStateId}
            onClose={handleUpdateLocation}
            button="Update"
            data={currentStateData}
            onUpdate={updateStateMutate}
            loading={updateStateLoading}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteLocation}>
          <DeleteItem
            onClose={handleDeleteLocation}
            onClick={handleOnDeleteLocation}
            loading={deleteStateLoading}
          />
        </Popup>
      )}
    </>
  );
};
