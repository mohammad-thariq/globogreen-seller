import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { WithdrawPaymentForm } from "@/common/Form/WithdrawPaymentForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { withdrawMethodPayTableHeading } from "@/constant/tableHeading";
import { withdrawPaymentAPI } from "@/service/withdrawPayment/withdrawPaymentAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const WithdrawMethod = () => {
  const {
    withdrawMethod,
    createWithdrawMethod,
    updateWithdrawMethod,
    deleteWithdrawMethod,
  } = new withdrawPaymentAPI();
  const { data, isLoading, refetch } = useQuery(
    ["withdrawMethod"],
    withdrawMethod
  );
  const [currentWithdrawMethodPayId, setCurrentWithdrawMethodPayId] =
    useState(null);
  const [currentWithdrawMethodPayData, setCurrentWithdrawMethodPayData] =
    useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  console.log(data, "Withdraw Method data");

  const {
    mutate: createWithdrawMethodPayMutate,
    isLoading: createWithdrawMethodPayLoading,
  } = useMutation(createWithdrawMethod, {
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
    mutate: updateWithdrawMethodPayMutate,
    isLoading: updateWithdrawMethodPayLoading,
  } = useMutation(updateWithdrawMethod, {
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

  const {
    mutate: DeleteWithdrawMethodPayMutate,
    isLoading: deleteWithdrawMethodPayLoading,
  } = useMutation(deleteWithdrawMethod, {
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

  const handleCreateWithdrawMethodPay = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateWithdrawMethodPay = (id) => {
    setCurrentWithdrawMethodPayId(id);
    const getCurrentWithdrawMethodPay = data?.methods?.find(
      (i) => i?.id === id
    );
    setCurrentWithdrawMethodPayData(getCurrentWithdrawMethodPay);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteWithdrawMethodPay = (id) => {
    setCurrentWithdrawMethodPayId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteWithdrawMethodPay = () => {
    DeleteWithdrawMethodPayMutate({ id: currentWithdrawMethodPayId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="Withdraw Method" />
      <Breadcrumb currentPage={"Withdraw Method"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateWithdrawMethodPay}
        />
      </div>
      <BaseTable
        tableHeadings={withdrawMethodPayTableHeading}
        onWithdrawPaymentData={data}
        onDelete={handleDeleteWithdrawMethodPay}
        onUpdate={handleUpdateWithdrawMethodPay}
      />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateWithdrawMethodPay}>
          <WithdrawPaymentForm
            onClose={handleCreateWithdrawMethodPay}
            button="Add"
            onSave={createWithdrawMethodPayMutate}
            loading={createWithdrawMethodPayLoading}
          />
        </Popup>
      )}
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateWithdrawMethodPay}>
          <WithdrawPaymentForm
            currentWithdrawMethodPayId={currentWithdrawMethodPayId}
            onClose={handleUpdateWithdrawMethodPay}
            button="Update"
            data={currentWithdrawMethodPayData}
            onUpdate={updateWithdrawMethodPayMutate}
            loading={updateWithdrawMethodPayLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteWithdrawMethodPay}>
          <DeleteItem
            onClose={handleDeleteWithdrawMethodPay}
            onClick={handleOnDeleteWithdrawMethodPay}
            loading={deleteWithdrawMethodPayLoading}
          />
        </Popup>
      )}
    </>
  );
};
