import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { ReviewForm } from "@/common/Form/DeliveryManForm/ReviewForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { reviewTableheading } from "@/constant/tableHeading";
import { DeliveryManAPI } from "@/service/deliveryMan/DeliveryManAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
export const Review = () => {
  const { review, updateReview, DeleteReview } = new DeliveryManAPI();
  const { data, isLoading, refetch } = useQuery(["recevieAmount"], review);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [currentReviewData, setCurrentReviewData] = useState(null);

  const { mutate: updateReviewMutate, isLoading: updateReviewLoading } =
    useMutation(updateReview, {
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

  const { mutate: DeleteReviewMutate, isLoading: deleteReviewLoading } =
    useMutation(DeleteReview, {
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

  const handleUpdateReview = (id) => {
    setCurrentReviewId(id);
    // const getCurrentReview = data?.countries?.find((i) => i?.id === id);
    // setCurrentReviewData(getCurrentReview);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeletereview = (id) => {
    setCurrentReviewId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteReview = () => {
    DeleteReviewMutate({ id: currentReviewId });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (data && data) {
    return <NoDataFound />;
  }
  return (
    <>
      <Breadcrumb currentPage={"Review"} serachEnable />
      <BaseTable tableHeadings={reviewTableheading} onReviewData={data} />
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleCreatereview}>
          <ReviewForm
            currentReviewId={currentReviewId}
            onClose={handleUpdateReview}
            button="Update"
            data={currentReviewData}
            onUpdate={updateReviewMutate}
            loading={updateReviewLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeletereview}>
          <DeleteItem
            onClose={handleDeletereview}
            onClick={handleOnDeleteReview}
            loading={deleteReviewLoading}
          />
        </Popup>
      )}
    </>
  );
};
