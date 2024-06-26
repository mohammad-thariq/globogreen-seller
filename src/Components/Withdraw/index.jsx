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

export const Withdraw = () => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  
  const {
    withdrawAccount,
    withdrawAccountInfo,
    createWithdraw,
  } = new withdrawAPI();
  const { data, isLoading, refetch } = useQuery(["withdrawAccount", "withdrawAccountInfo"], withdrawAccount, withdrawAccountInfo);


  const { mutate: createWithdrawMutate, isLoading: createWithdrawLoading } =
    useMutation(createWithdraw, {
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
      <BaseTable tableHeadings={WithdrawTableHeading} />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleAddWithdraw}>
          <WithdrawForm button="Add" onClose={handleAddWithdraw} 
          onSave={createWithdrawMutate}
          loading={createWithdrawLoading}/>
        </Popup>
      )}
      
    </>
  );
};
