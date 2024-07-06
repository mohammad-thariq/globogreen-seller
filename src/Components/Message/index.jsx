import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { PageHeader } from "@/common/PageHeader";
import { MessageAPI } from "@/service/message/MessageAPI";
import { useQuery } from "react-query";

export const Message = () => {
  const {
    messageList
  } = new MessageAPI();
  const { data, isLoading, refetch } = useQuery(
    ["messageList"],
    messageList
  );

  console.log(data , "customer List")
  return (
    <>
      <PageHeader title="Message" />
      <Breadcrumb currentPage={"Message"} serachEnable />
      <BaseTable  length={data?.customer_list.length == 0 }/>
    </>
  );
};
