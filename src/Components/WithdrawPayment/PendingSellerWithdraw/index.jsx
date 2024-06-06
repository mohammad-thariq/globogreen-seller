import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { PageHeader } from "@/common/PageHeader";
import { withdrawPaymentAPI } from "@/service/withdrawPayment/withdrawPaymentAPI";
import { PendingSellerTableHeading } from "@/constant/tableHeading";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";

export const PendingSellerWithdraw = () => {
  const { pendingSeller, deletePendingSeller } = new withdrawPaymentAPI();
  const { data, isLoading, refetch } = useQuery(
    ["pendingSeller"],
    pendingSeller
  );
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentPendingSellerId, setCurrentPendingSellerId] = useState(null);
  console.log(data, "Pending Seller data");

  const {
    mutate: DeletePendingSellerMutate,
    isLoading: deletePendingSellerLoading,
  } = useMutation(deletePendingSeller, {
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

  const handleDeletePendingSeller = (id) => {
    setCurrentPendingSellerId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeletePendingSeller = () => {
    DeletePendingSellerMutate({ id: currentPendingSellerId });
  };

  if (data && !data.withdraws) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="Pending Seller Withdraw" />
      <Breadcrumb currentPage={"Pending Seller Withdraw"} serachEnable />
      <BaseTable
        tableHeadings={PendingSellerTableHeading}
        onPendingSellerData={data}
        onDelete={handleDeletePendingSeller}
      />
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeletePendingSeller}>
          <DeleteItem
            onClose={handleDeletePendingSeller}
            onClick={handleOnDeletePendingSeller}
            loading={deletePendingSellerLoading}
          />
        </Popup>
      )}
    </>
  );
};
