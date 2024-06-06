import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { DeliveryManWithdrawMethod } from "@/common/Form/DeliveryWithdrawForm/DeliveryManWithdrawMethod";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { WithdrawMethodTableheading } from "@/constant/tableHeading";
import { DeliveryWithdrawAPI } from "@/service/deliveryWithdraw/DeliveryWithdrawAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const WithdrawMethod = () => {
  const { withdrawMethod, CreateWithdrawMethod ,UpdateWithdrawMethod,DeleteWithdrawMethod} = new DeliveryWithdrawAPI();
  const { data, isLoading, refetch } = useQuery(
    ["withdrawMethod"],
    withdrawMethod
  );
  const [currentWithdrawMethodId, setCurrentWithdrawMethodId] = useState(null);
  const [currentWithdrawMethodData, setCurrentWithdrawMethodData] =
    useState(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  console.log(data, "withdrawMethod data");

  const {
    mutate: createWithdrawMethodMutate,
    isLoading: createWithdrawMethodLoading,
  } = useMutation(CreateWithdrawMethod, {
    onSuccess: (data, variables, context) => {
      setOpenCreatePopup(false);
      ToastifySuccess(data?.messege);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenCreatePopup(true);
      refetch();
      ToastifyFailed(data?.messege);
    },
  });

  
  const { mutate: UpdateWithdrawMethodMutate, isLoading: updateWithdrawMethodLoading } =
    useMutation(UpdateWithdrawMethod, {
      onSuccess: (data, variables, context) => {
        setOpenUpdatePopup(false);
        ToastifySuccess(data?.messege);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenUpdatePopup(true);
        ToastifyFailed(data?.messege);
        refetch();
      },
    });

    
  const { mutate: DeleteWithdrawMethodMutate, isLoading: deleteWithdrawMethodLoading } =
  useMutation(DeleteWithdrawMethod, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.messege);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.messege);
    },
  });


  const handleCreateWithDrawMethod = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  const handleUpdateWithDrawMethod = (id) => {
    setCurrentWithdrawMethodId(id);
    const getCurrentWithdrawMethod = data[0]?.find((i) => i?.id === id);
    console.log(getCurrentWithdrawMethod);
    setCurrentWithdrawMethodData(getCurrentWithdrawMethod);
    setOpenUpdatePopup(!openUpdatePopup);
  };

  const handleDeleteWithDrawMethod = (id) => {
    setCurrentWithdrawMethodId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteWithdrawMethod = () => {
    DeleteWithdrawMethodMutate ({ id: currentWithdrawMethodId });
  };

  if (data && !data) {
    return <NoDataFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title={"Withdraw Method"} />
      <Breadcrumb currentPage={"Withdraw Method"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateWithDrawMethod}
        />
      </div>
      <BaseTable
        tableHeadings={WithdrawMethodTableheading}
        onWithdrawMethodData={data}
        onDelete={handleDeleteWithDrawMethod}
        onUpdate={handleUpdateWithDrawMethod}
      />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateWithDrawMethod}>
          <DeliveryManWithdrawMethod
            button="ADD"
            onClose={handleCreateWithDrawMethod}
            onSave={createWithdrawMethodMutate}
            loading={createWithdrawMethodLoading}
          />
        </Popup>
      )}

      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateWithDrawMethod}>
          <DeliveryManWithdrawMethod
            currentWithdrawMethodId={currentWithdrawMethodId}
            onClose={handleUpdateWithDrawMethod}
            button="Update"
            data={currentWithdrawMethodData}
            onUpdate={UpdateWithdrawMethodMutate}
            loading={updateWithdrawMethodLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteWithDrawMethod}>
          <DeleteItem onClose={handleDeleteWithDrawMethod}
          onClick={handleOnDeleteWithdrawMethod}
          loading={deleteWithdrawMethodLoading}
          />
        </Popup>
      )}
    </>
  );
};
