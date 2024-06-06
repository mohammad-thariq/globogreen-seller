import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { SellerListForm } from "@/common/Form/Users/SellerListForm";
import { SendEmailForm } from "@/common/Form/Users/SendEmailForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { SellerListTableHeading } from "@/constant/tableHeading";
import { UsersAPI } from "@/service/users/UsersAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const SellerList = () => {
  const [sendEmailToAll, setSendEmailToAll] = useState(false);
  const [sendEmailToOne, setSendEmailToOne] = useState(false);
  const [currentSellerId, setCurrentSellerId] = useState(null);
  const [currentSellerData, setCurrentSellerData] = useState(null);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { sellerList, updateSellerStatus, deleteSeller } = new UsersAPI();
  const { data, isLoading, refetch } = useQuery(["sellerList"], sellerList);
  console.log(data, "sell Data");

  const handleSendEmailToAll = () => {
    setSendEmailToAll(!sendEmailToAll);
  };

  const handleSendEmailToOne = (id) => {
    setSendEmailToOne(!sendEmailToOne);
  };

  const { mutate: updateSellerMutate, isLoading: updateSellerLoading } =
    useMutation(updateSellerStatus, {
      onSuccess: (data, variables, context) => {
        setOpenUpdatePopup(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenUpdatePopup(true);
        ToastifyFailed(data?.message);
        refetch();
      },
    });

  const { mutate: DeleteSellerMutate, isLoading: deleteSellerLoading } =
    useMutation(deleteSeller, {
      onSuccess: (data, variables, context) => {
        setOpenDeletePopup(false);
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        setOpenDeletePopup(true);
        ToastifyFailed(data?.message);
      },
    });

  const handleUpdateSeller = (id) => {
    setOpenUpdatePopup(!openUpdatePopup);
    setCurrentSellerId(id);
    const getCurrentSellerId = data?.sellers?.find((i) => i?.id === id);
    setCurrentSellerData(getCurrentSellerId);
    console.log(getCurrentSellerId);
  };

  const handleDeleteSeller = (id) => {
    setCurrentSellerId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteSeller = () => {
    DeleteSellerMutate({ id: currentSellerId });
  };
  return (
    <>
      <PageHeader title="Seller List" />
      <Breadcrumb currentPage={"Seller List"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Send Email to all seller "
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleSendEmailToAll}
        />
      </div>
      <BaseTable
        tableHeadings={SellerListTableHeading}
        onSellerListData={data}
        onDelete={handleDeleteSeller}
        onUpdate={handleUpdateSeller}
        onSend={handleSendEmailToAll}
      />
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteSeller}>
          <DeleteItem
            onClose={handleDeleteSeller}
            onClick={handleOnDeleteSeller}
            loading={deleteSellerLoading}
          />
        </Popup>
      )}
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateSeller}>
          <SellerListForm
            currentSellerId={currentSellerId}
            onClose={handleUpdateSeller}
            button="Update"
            data={currentSellerData}
            onUpdate={updateSellerMutate}
            loading={updateSellerLoading}
          />
        </Popup>
      )}
      {sendEmailToAll && (
        <Popup open={sendEmailToAll} onClose={handleSendEmailToAll}>
          <SendEmailForm onClose={handleSendEmailToAll} />
        </Popup>
      )}

      {sendEmailToOne && (
        <Popup open={sendEmailToOne} onClose={handleSendEmailToOne}>
          <SendEmailForm onClose={handleSendEmailToOne} />
        </Popup>
      )}
    </>
  );
};
