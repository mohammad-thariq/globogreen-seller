import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { contactMessageTablHeading } from "@/constant/tableHeading";
import { ContactMessageAPI } from "@/service/contactMessage/ContactMessageAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const ContactMessage = () => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentContactId, setCurrentContactId] = useState(null);

  const { contactMessage, deleteContactMessage } =
  new ContactMessageAPI();
const { data, isLoading, refetch } = useQuery(["product-category"], contactMessage);
console.log(data , "contact data")

  const { mutate: deleteContactMutate, isLoading: deleteContactLoading } =
  useMutation(deleteContactMessage, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.message);
      refetch();
      
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.message);
      refetch();
     
    },
  });

  const handleDeleteContact = (id) => {
    setOpenDeletePopup(!openDeletePopup);
    setCurrentContactId(id)
  };

  const handleOnDeleteContact = () => {
    deleteContactMutate({id: currentContactId})
  }
  return (
    <>
      <PageHeader title="Contact Message" />
      <Breadcrumb currentPage={"Contact Message"} serachEnable />
      <BaseTable tableHeadings={contactMessageTablHeading} onContactMessageData={data} onDelete={handleDeleteContact}/>
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteContact}>
          <DeleteItem onClose={handleDeleteContact} onClick={handleOnDeleteContact} loading={deleteContactLoading}></DeleteItem>
        </Popup>
      )}
    </>
  );
};
