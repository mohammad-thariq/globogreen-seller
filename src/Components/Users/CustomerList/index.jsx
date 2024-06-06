import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import {
  CustomerListForm,
  CustomerListViewEdit,
} from "@/common/Form/Users/CustomerListForm";
import { SendEmailForm } from "@/common/Form/Users/SendEmailForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { customerListTableHeading } from "@/constant/tableHeading";
import { UsersAPI } from "@/service/users/UsersAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const CustomerList = () => {
  const [sendEmailToAll, setSendEmailToAll] = useState(false);
  const [sendEmailToOne, setSendEmailToOne] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [currentCustomerListData, setCurrentCustomerListData] = useState(null);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const { customer, deleteCustomerList, updateCustomerStatus } = new UsersAPI();
  const { data, isLoading, refetch } = useQuery(["customer"], customer);

  console.log(data, "customer data");

  const {
    mutate: updateCustomerListMutate,
    isLoading: updateCustomerListLoading,
  } = useMutation(updateCustomerStatus, {
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

  const {
    mutate: DeleteCustomerListMutate,
    isLoading: deleteCustomerListLoading,
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

  const handleUpdateUser = (id) => {
    setOpenUpdatePopup(!openUpdatePopup);
    setCurrentCustomerId(id);
    const getCurrentCustomerId = data?.customers?.find((i) => i?.id === id);
    setCurrentCustomerListData(getCurrentCustomerId);
    console.log(getCurrentCustomerId);
  };

  const handleDeleteUser = (id) => {
    setOpenDeletePopup(!openDeletePopup);
    setCurrentCustomerId(id);
  };

  const handleOnDeleteCustomerList = () => {
    DeleteCustomerListMutate({ id: currentCustomerId });
  };

  return (
    <>
      <PageHeader title="Customer List" />
      <Breadcrumb currentPage={"Customer List"} serachEnable />
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
        tableHeadings={customerListTableHeading}
        onCustomerListData={data}
        onDelete={handleDeleteUser}
        onUpdate={handleUpdateUser}
        onSend={handleSendEmailToOne}
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
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateUser}>
          <CustomerListForm
            onClose={handleUpdateUser}
            button="Update"
            currentCustomerId={currentCustomerId}
            data={currentCustomerListData}
            onUpdate={updateCustomerListMutate}
            loading={updateCustomerListLoading}
          />
        </Popup>
      )}

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteUser}>
          <DeleteItem
            onClose={handleDeleteUser}
            onClick={handleOnDeleteCustomerList}
            loading={deleteCustomerListLoading}
          />
        </Popup>
      )}
    </>
  );
};
