import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { RecevieAmountForm } from "@/common/Form/DeliveryManForm/RecevieAmountForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { reciveAmountTableheading } from "@/constant/tableHeading";
import { DeliveryManAPI } from "@/service/deliveryMan/DeliveryManAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const RecevieAmount = () => {
  const { recevieAmount, createRecevieAmount, deleteRecevieAmount } =
    new DeliveryManAPI();
  const { data, isLoading, refetch } = useQuery(
    ["recevieAmount"],
    recevieAmount
  );
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentRecevieAmountId, setCurrentRecevieAmountId] = useState(null);

  const {
    mutate: createRecevieAmountMutate,
    isLoading: createRecevieAmountLoading,
  } = useMutation(createRecevieAmount, {
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
    mutate: DeleteRecevieAmountMutate,
    isLoading: deleteRecevieAmountLoading,
  } = useMutation(deleteRecevieAmount, {
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

  const handleCreateReceiveAmount = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleDeleteReceiveAmount = (id) => {
    setCurrentRecevieAmountId(id)
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteReceiveAmount = () => {
    DeleteRecevieAmountMutate({ id: currentRecevieAmountId });
  };
  if (isLoading) {
    return <Loader />;
  }

  if(data && data){
    return <NoDataFound />
  }
  return (
    <>
      <Breadcrumb currentPage={"Receive Amount"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateReceiveAmount}
        />
      </div>
      <BaseTable
        tableHeadings={reciveAmountTableheading}
        onRecevieAmountData={data}
        onDelete={handleDeleteReceiveAmount}
      />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateReceiveAmount}>
          <RecevieAmountForm
            onClose={handleCreateReceiveAmount}
            button="ADD"
            onSave={createRecevieAmountMutate}
            loading={createRecevieAmountLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteReceiveAmount}>
          <DeleteItem
            onClose={handleDeleteReceiveAmount}
            onClick={handleOnDeleteReceiveAmount}
            loading={deleteRecevieAmountLoading}
          />
        </Popup>
      )}
    </>
  );
};
