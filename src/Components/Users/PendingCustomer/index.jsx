import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { SendEmailForm } from "@/common/Form/Users/SendEmailForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { customerListTableHeading } from "@/constant/tableHeading";
import { UsersAPI } from "@/service/users/UsersAPI";
import { useState } from "react";
import { useQuery } from "react-query";

export const PendingCustomer = () => {
  const [sendEmailToAll, setSendEmailToAll] = useState(false);
  const [sendEmailToOne, setSendEmailToOne] = useState(false);
  const [currentPendingCustomerId, setCurrentPendingCustomerId] =
    useState(null);
  const [currentPendingCustomerListData, setCurrentPendingCustomerListData] =
    useState(null);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { pendingCustomer, deleteCustomerList, updateCustomerStatus } =
    new UsersAPI();
  const { data, isLoading, refetch } = useQuery(
    ["pendingCustomer"],
    pendingCustomer
  );
  console.log(data, "pending Dataaa");

  const {
    mutate: DeletePendingCustomerListMutate,
    isLoading: deletePendingCustomerListLoading,
  } = useMutation(deleteCustomerList, {
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

  const handleDeletePendingList = (id) => {
    setOpenDeletePopup(!openDeletePopup);
    setCurrentPendingCustomerId(id);
  };

  const handleOnDeletePendingCustomer = () => {
    DeletePendingCustomerListMutate({ id: currentPendingCustomerId });
  };
  return (
    <>
      <PageHeader title="Pending Customer" />
      <Breadcrumb currentPage={"Pending Customer"} serachEnable />
      <BaseTable
        tableHeadings={customerListTableHeading}
        onPendingCustomerListData={data}
        onDelete={handleDeletePendingList}
      />

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

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeletePendingList}>
          <DeleteItem
            onClose={handleDeletePendingList}
            onClick={handleOnDeletePendingCustomer}
            loading={deletePendingCustomerListLoading}
          />
        </Popup>
      )}
    </>
  );
};
