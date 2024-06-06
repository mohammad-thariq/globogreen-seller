import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { SendEmailForm } from "@/common/Form/Users/SendEmailForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { SellerListTableHeading } from "@/constant/tableHeading";
import { UsersAPI } from "@/service/users/UsersAPI";
import { useState } from "react";
import { useQuery } from "react-query";

export const PendingSeller = () => {
  const [sendEmailToAll, setSendEmailToAll] = useState(false);
  const [sendEmailToOne, setSendEmailToOne] = useState(false);
  const [currentPendingSellerId, setCurrentPendingSellerId] = useState(null);
  const [currentPendingSellerListData, setCurrentPendingSellerListData] =
    useState(null);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { pendingSeller, deletePendingSeller, updateCustomerStatus } =
    new UsersAPI();
  const { data, isLoading, refetch } = useQuery(
    ["pendingSeller"],
    pendingSeller
  );
  console.log(data, "pending seller Dataaa");

  const {
    mutate: DeletePendingSellerListMutate,
    isLoading: deletePendingSellerListLoading,
  } = useMutation(deletePendingSeller, {
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

  const handleSendEmailToAll = () => {
    setSendEmailToAll(!sendEmailToAll);
  };

  const handleSendEmailToOne = (id) => {
    setSendEmailToOne(!sendEmailToOne);
  };

  const handleDeletePendingSeller = (id) => {
    setOpenDeletePopup(!openDeletePopup);
    setCurrentPendingSellerId(id);
  };

  const handleOnDeletePendingSellerList = () => {
    DeletePendingSellerListMutate({ id: currentCustomerId });
  };
  return (
    <>
      <PageHeader title="Pending Seller" />
      <Breadcrumb currentPage={"Pending Seller"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Send Email to all user"
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
        onPendingSellerListData={data}
      />
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeletePendingSeller}>
          <DeleteItem
            onClose={handleDeletePendingSeller}
            onClick={handleOnDeletePendingSellerList}
            loading={deletePendingSellerListLoading}
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
