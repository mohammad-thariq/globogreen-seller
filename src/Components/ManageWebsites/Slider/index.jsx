import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { SliderForm } from "@/common/Form/ManageWebsitesForm/SlidersForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { sliderTableHeading } from "@/constant/tableHeading";
import { ManageWebsitesAPI } from "@/service/manageWebsites/ManageWebsitesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const Slider = () => {
  const [currentSliderId, setCurrentSliderId] = useState(null);
  const [currentSliderData, setCurrentSliderData] = useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { slider, createSlider, updateSlider, deleteSlider } =
    new ManageWebsitesAPI();
  const { data, isLoading, refetch } = useQuery(["slider"], slider);
  console.log(data, "Slider data");

  const { mutate: createSliderMutate, isLoading: createSliderLoading } =
    useMutation(createSlider, {
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

  const { mutate: updateSliderMutate, isLoading: updateSliderLoading } =
    useMutation(updateSlider, {
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

  const { mutate: DeleteSliderMutate, isLoading: deleteSliderLoading } =
    useMutation(deleteSlider, {
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

  const handleCreateSlider = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateSlider = (id) => {
    setCurrentSliderId(id);
    setOpenUpdatePopup(!openUpdatePopup);
    const getCurrentSlider = data?.sliders?.find((i) => i?.id === id);
    setCurrentSliderData(getCurrentSlider);
    console.log(getCurrentSlider, "getCurrentSlider")
  };

  const handleDeleteSlider = (id) => {
    setOpenDeletePopup(!openDeletePopup);
    setCurrentSliderId(id);
  };

  const handleOnDeleteSlider = () => {
    DeleteSliderMutate({ id: currentSliderId });
  };
  return (
    <>
      <PageHeader title="Slider" />
      <Breadcrumb currentPage={"Slider"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateSlider}
        />
      </div>
      <BaseTable
        tableHeadings={sliderTableHeading}
        onSliderData={data}
        onUpdate={handleUpdateSlider}
        onDelete={handleDeleteSlider}
      />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateSlider}>
          <SliderForm
            onClose={handleCreateSlider}
            button="Add"
            onSave={createSliderMutate}
            loading={createSliderLoading}
          />
        </Popup>
      )}
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateSlider}>
          <SliderForm
            onClose={handleUpdateSlider}
            currentSliderId={currentSliderId}
            button="Update"
            data={currentSliderData}
            onUpdate={updateSliderMutate}
            loading={updateSliderLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteSlider}>
          <DeleteItem
            onClose={handleDeleteSlider}
            onClick={handleOnDeleteSlider}
            loading={deleteSliderLoading}
          />
        </Popup>
      )}
    </>
  );
};
