import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { locationAPI } from "@/service/location/loctionAPI";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { CountryForm } from "@/common/Form/LocationForm/CountryForm";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { CountryTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";

export const Country = () => {
  const {
    country,
    createCountryLocation,
    updateCountryLocation,
    deleteCountryLocation,
  } = new locationAPI();
  const { data, isLoading, refetch } = useQuery(["country"], country);
  const [currentCountryId, setCurrentCountryId] = useState(null);
  const [currentCountryData, setCurrentCountryData] = useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { mutate: createCountryMutate, isLoading: createCountryLoading } =
    useMutation(createCountryLocation, {
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

  const { mutate: updateCountryMutate, isLoading: updateCountryLoading } =
    useMutation(updateCountryLocation, {
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

  const { mutate: DeleteCountryMutate, isLoading: deleteCountryLoading } =
    useMutation(deleteCountryLocation, {
      onSuccess: (data, variables, context) => {
        setOpenDeletePopup(false);
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenDeletePopup(true);
        ToastifyFailed(data?.notification);
      },
    });

  const handleCreateLocation = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateLocation = (id) => {
    setCurrentCountryId(id);
    const getCurrentCounrty = data?.countries?.find((i) => i?.id === id);
    setCurrentCountryData(getCurrentCounrty);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteLocation = (id) => {
    setCurrentCountryId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteLocation = () => {
    DeleteCountryMutate({ id: currentCountryId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb currentPage={"Country"} serachEnable />
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
        tableHeadings={CountryTableHeading}
        onDelete={handleDeleteLocation}
        onUpdate={handleUpdateLocation}
        onCountryData={data}
      />

      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateLocation}>
          <CountryForm
            onClose={handleCreateLocation}
            button="Add"
            onSave={createCountryMutate}
            loading={createCountryLoading}
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateLocation}>
          <CountryForm
            currentCountryId={currentCountryId}
            onClose={handleUpdateLocation}
            button="Update"
            data={currentCountryData}
            onUpdate={updateCountryMutate}
            loading={updateCountryLoading}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteLocation}>
          <DeleteItem
            onClose={handleDeleteLocation}
            onClick={handleOnDeleteLocation}
            loading={deleteCountryLoading}
          />
        </Popup>
      )}
    </>
  );
};
