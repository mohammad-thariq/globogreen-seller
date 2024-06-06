import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { CouponTableHeading } from "@/constant/tableHeading";
import { EcommerceAPI } from "@/service/ecommerce/EcommerceAPI";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
import { CouponForm } from "@/common/Form/EcommerceForm/Coupon";

export const Coupon = () => {
  const {
    coupon,
    createCoupon,
    updateCoupon,
    deleteCoupon,
  } = new EcommerceAPI();
  const { data, isLoading, refetch } = useQuery(["Coupon"], coupon);
  const [currentCouponId, setCurrentCouponId] = useState(null);
  const [currentCouponData, setCurrentCouponData] = useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { mutate: createCouponMutate, isLoading: createCouponLoading } =
    useMutation(createCoupon, {
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

  const { mutate: updateCouponMutate, isLoading: updateCouponLoading } =
    useMutation(updateCoupon, {
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

  const { mutate: DeleteCouponMutate, isLoading: deleteCouponLoading } =
    useMutation(deleteCoupon, {
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

  const handleCreateCoupon = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateCoupon = (id) => {
    setCurrentCouponId(id);
    const getCurrentCounrty = data?.coupons?.find((i) => i?.id === id);
    setCurrentCouponData(getCurrentCounrty);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteCoupon = (id) => {
    setCurrentCouponId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteCoupon = () => {
    DeleteCouponMutate({ id: currentCouponId });
  };

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  console.log(currentCouponData, 'currentCouponData');

  return (
    <>
      <Breadcrumb currentPage={"Coupon"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateCoupon}
        />
      </div>
      <BaseTable
        tableHeadings={CouponTableHeading}
        onDelete={handleDeleteCoupon}
        onUpdate={handleUpdateCoupon}
        onCouponData={data}
      />

      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateCoupon}>
          <CouponForm
            onClose={handleCreateCoupon}
            button="Add"
            onSave={createCouponMutate}
            loading={createCouponLoading}
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateCoupon}>
          <CouponForm
            currentCouponId={currentCouponId}
            onClose={handleUpdateCoupon}
            button="Update"
            data={currentCouponData}
            onUpdate={updateCouponMutate}
            loading={updateCouponLoading}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteCoupon}>
          <DeleteItem
            onClose={handleDeleteCoupon}
            onClick={handleOnDeleteCoupon}
            loading={deleteCouponLoading}
          />
        </Popup>
      )}
    </>
  );
};
