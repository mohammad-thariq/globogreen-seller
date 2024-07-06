import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { WithdrawForm } from "@/common/Form/WithdrawForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { WithdrawTableHeading } from "@/constant/tableHeading";
import { withdrawAPI } from "@/service/Withdraw/WithdrawAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const Withdraw = () => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const {
    withdrawAccount,
    withdrawMethods,
    withdrawAccountInfo,
    createWithdraw,
  } = new withdrawAPI();
  const { data, isLoading, refetch } = useQuery(
    ["withdrawAccount"],
    withdrawAccount
  );
  const {
    data: widthDrawAccInfoData,
    isLoading: withdrawAccountInfoLoading,
    refetch: refetchWithdrawAccount,
  } = useQuery(["withdrawAccountInfo"], withdrawAccountInfo);
  const { data: withdraw, isLoadings: withdrawLoading } = useQuery(
    ["withdrawMethods"],
    withdrawMethods
  );
  console.log(data, "Withdraw data");
  console.log(widthDrawAccInfoData, "widthDrawAccInfoData");
  console.log(withdraw, "withdrawMethods");

  const { mutate: createWithdrawMutate, isLoading: createWithdrawLoading } =
    useMutation(createWithdraw, {
      onSuccess: (data, variables, context) => {
        setOpenCreatePopup(false)
        ToastifySuccess(data?.notification);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenCreatePopup(true)
        ToastifyFailed(data?.notification);
      },
    });

  const handleAddWithdraw = () => {
    setOpenCreatePopup(!openCreatePopup);
  };

  // const handleDeleteWithdraw = (id) => {
  //   setCurrentCountryId(id);
  //   setOpenDeletePopup(!openDeletePopup);
  // };

  // const handleOnDeleteLocation = () => {
  //   DeleteCountryMutate({ id: currentCountryId });
  // };

  return (
    <>
      <PageHeader title="Withdraw" />
      <Breadcrumb currentPage={"Withdraw"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="New  Withdraw"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleAddWithdraw}
        />
      </div>
      <BaseTable tableHeadings={WithdrawTableHeading} 
      length={data?.withdraws.length == 0}/>
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleAddWithdraw}>
          <WithdrawForm
            button="Add"
            onClose={handleAddWithdraw}
            onwithdraw={withdraw}
            onSave={createWithdrawMutate}
            loading={createWithdrawLoading}
          />
        </Popup>
      )}
    </>
  );
};
