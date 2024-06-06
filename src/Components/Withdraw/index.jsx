import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { WithdrawForm } from "@/common/Form/WithdrawForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { WithdrawTableHeading } from "@/constant/tableHeading";
import { useState } from "react";

export const Withdraw = () => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const handleAddWithdraw =()=>{
    setOpenCreatePopup(!openCreatePopup)
  }
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
      <BaseTable tableHeadings={WithdrawTableHeading}/>
      {openCreatePopup && <Popup open={openCreatePopup} onClose={handleAddWithdraw}>
        <WithdrawForm button="Add" onClose={handleAddWithdraw}/>
        </Popup>}
    </>
  );
};
