import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { withdrawPaymentAPI } from "@/service/withdrawPayment/withdrawPaymentAPI";
import { sellerWithdrawTableHeading } from "@/constant/tableHeading";
import { useMutation, useQuery } from "react-query";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { useState } from "react";

export const SellerWithdrawMethod = () => {
  const { sellerWithdraw, deleteSellerWithdraw } = new withdrawPaymentAPI();
  const [currentSellerWithdrawId, setCurrentSellerWithdrawId] = useState(null);
  const { data, isLoading, refetch } = useQuery(
    ["sellerWithdraw"],
    sellerWithdraw
  );
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  console.log(data, "sellerWithdraw data");

  const {
    mutate: DeleteSellerWithdrawMutate,
    isLoading: deleteSellerWithdrawLoading,
  } = useMutation(deleteSellerWithdraw, {
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

  const handleDeleteSellerWithdraw = (id) => {
    setCurrentSellerWithdrawId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteSellerWithdraw = () => {
    DeleteSellerWithdrawMutate({ id: currentSellerWithdrawId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Breadcrumb currentPage={"Seller Withdraw Method"} serachEnable />
      <BaseTable
        tableHeadings={sellerWithdrawTableHeading}
        onSellerWithdrawData={data}
        onDelete={handleDeleteSellerWithdraw}
      />
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteSellerWithdraw}>
          <DeleteItem
            onClose={handleDeleteSellerWithdraw}
            onClick={handleOnDeleteSellerWithdraw}
            loading={deleteSellerWithdrawLoading}
          />
        </Popup>
      )}
    </>
  );
};
