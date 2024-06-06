import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { CityForm } from "@/common/Form/LocationForm/CityForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { CityTableHeading } from "@/constant/tableHeading";
import { locationAPI } from "@/service/location/loctionAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const City = () => {
  const {
    city,
    country,
    createCityLocation,
    updateCityLocation,
    deleteCityLocation,
  } = new locationAPI();
  const { data, isLoading, refetch } = useQuery(["city"], city);
  const { data: countryData } = useQuery(["country"], country);
  const [currentCityId, setCurrentCityId] = useState(null);
  const [currentCityData, setCurrentCityData] = useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { mutate: createCityMutate, isLoading: createCityLoading } =
    useMutation(createCityLocation, {
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

  const { mutate: updateCityMutate, isLoading: updateCityLoading } =
    useMutation(updateCityLocation, {
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

  const { mutate: DeleteCityMutate, isLoading: deleteCityLoading } =
    useMutation(deleteCityLocation, {
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
    setCurrentCityId(id);
    const getCurrentCity = data?.cities?.find((i) => i?.id === id);
    setCurrentCityData(getCurrentCity);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteLocation = (id) => {
    setCurrentCityId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteLocation = () => {
    DeleteCityMutate({ id: currentCityId });
  };

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"City"} serachEnable />
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
        tableHeadings={CityTableHeading}
        onCityData={data}
        getCountry={countryData}
        onDelete={handleDeleteLocation}
        onUpdate={handleUpdateLocation}
      />

      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateLocation}>
          <CityForm
            getCountry={countryData}
            onClose={handleCreateLocation}
            button="Add"
            onSave={createCityMutate}
            loading={createCityLoading}
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateLocation}>
          <CityForm
            getCountry={countryData}
            currentCityId={currentCityId}
            onClose={handleUpdateLocation}
            button="Update"
            data={currentCityData}
            onUpdate={updateCityMutate}
            loading={updateCityLoading}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteLocation}>
          <DeleteItem
            onClose={handleDeleteLocation}
            onClick={handleOnDeleteLocation}
            loading={deleteCityLoading}
          />
        </Popup>
      )}
    </>
  );
};
