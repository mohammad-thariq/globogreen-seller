import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
// import { Popup } from "@/common/Popup";
// import { DeleteItem } from "@/common/Popup/DeleteItem";
import { pendingTableHeading } from "@/constant/tableHeading";
import { DeliveryWithdrawAPI } from "@/service/deliveryWithdraw/DeliveryWithdrawAPI";
// import { useState } from "react";
import { useQuery } from "react-query";

export const PendingWithdraw = () => {
  const { pendingWithdraw, pendingWithdrawDelete } = new DeliveryWithdrawAPI();
  const { data,isLoading, refetch } = useQuery(["pendingWithdraw"], pendingWithdraw);
  console.log(data,"data...")
  // const [openDeletePopup, setOpenDeletePopup] = useState(false);
  //  const [currentWithDrawId, setCurrentWithDrawId] = useState(null);
  // console.log(data , "withdraw")

  // const {
  //   mutate: DeleteWithDrawMutate,
  //   isLoading: deletePendingWithDrawLoading,
  // } = useMutation(pendingWithdrawDelete, {
  //   onSuccess: (data, variables, context) => {
  //     setOpenDeletePopup(false);
  //     ToastifySuccess(data?.messege);
  //     refetch();
  //   },
  //   onError: (data, variables, context) => {
  //     setOpenDeletePopup(true);
  //     ToastifyFailed(data?.messege);
  //     // refetch();
  //   },
  // });


  // const handleDeletePendingWithdraw = (id) => {
  //   // setCurrentWithDrawId(id);
  //   setOpenDeletePopup(!openDeletePopup);
  // };

  // const handleOnDeletePendingWithDraw = () => {
  //   DeleteWithDrawMutate({ id: currentWithDrawId });
  // };

  if (data && data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Pending Withdraw"} serachEnable />
     <BaseTable tableHeadings={pendingTableHeading} onPendingWithdrawData={data}/>
     {/* {openDeletePopup && 
     <Popup open={openDeletePopup} onClose={handleDeletePendingWithdraw}>
      <DeleteItem onClose={handleDeletePendingWithdraw}/>
      </Popup>} */}
    </>
  );
};
