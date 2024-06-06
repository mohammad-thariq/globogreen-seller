import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { FlashSaleTableHeading } from "@/constant/tableHeading";
import { EcommerceAPI } from "@/service/ecommerce/EcommerceAPI";
import { FlashSaleForm } from "@/common/Form/EcommerceForm/FlashSale";
import { NoDataFound } from "@/common/NoDataFound";
import { MutatingDots } from "react-loader-spinner";
import { Loader } from "@/common/Loader";

export const FlashSaleProduct = () => {
  const {
    flashSaleProduct,
    createFlashSaleProduct,
    updateFlashSaleProduct,
    deleteFlashSaleProduct,
  } = new EcommerceAPI();
  const { data, isLoading, refetch } = useQuery(["Flash-Sale-Product"], flashSaleProduct);
  const [currentFlashSaleId, setCurrentFlashSaleId] = useState(null);
  const [currentFlashSaleData, setCurrentFlashSaleData] = useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { mutate: createFlashSaleMutate, isLoading: createFlashSaleLoading } =
    useMutation(createFlashSaleProduct, {
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

  const { mutate: updateFlashSaleMutate, isLoading: updateFlashSaleLoading } =
    useMutation(updateFlashSaleProduct, {
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

  const { mutate: DeleteFlashSaleMutate, isLoading: deleteFlashSaleLoading } =
    useMutation(deleteFlashSaleProduct, {
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

  const handleCreateFlashSale = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateFlashSale = (id) => {
    setCurrentFlashSaleId(id);
    const getCurrentCounrty = data?.countries?.find((i) => i?.id === id);
    setCurrentFlashSaleData(getCurrentCounrty);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteFlashSale = (id) => {
    setCurrentFlashSaleId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteFlashSale = () => {
    DeleteFlashSaleMutate({ id: currentFlashSaleId });
  };

  if (data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Flash Sale Product"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateFlashSale}
        />
      </div>
      <BaseTable
        tableHeadings={FlashSaleTableHeading}
        onDelete={handleDeleteFlashSale}
        onUpdate={handleUpdateFlashSale}
        onFlashSaleData={data}
      />

      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateFlashSale}>
          <FlashSaleForm
            onClose={handleCreateFlashSale}
            button="Add"
            onSave={createFlashSaleMutate}
            loading={createFlashSaleLoading}
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateFlashSale}>
          <FlashSaleForm
            currentFlashSaleId={currentFlashSaleId}
            onClose={handleUpdateFlashSale}
            button="Update"
            data={currentFlashSaleData}
            onUpdate={updateFlashSaleMutate}
            loading={updateFlashSaleLoading}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteFlashSale}>
          <DeleteItem
            onClose={handleDeleteFlashSale}
            onClick={handleOnDeleteFlashSale}
            loading={deleteFlashSaleLoading}
          />
        </Popup>
      )}
    </>
  );
};
