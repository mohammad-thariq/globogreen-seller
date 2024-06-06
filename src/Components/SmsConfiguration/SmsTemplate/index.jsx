import { BaseTable } from "@/common/BaseTable"
import { Breadcrumb } from "@/common/Breadcrumb"
import { PageHeader } from "@/common/PageHeader"
import { smsTemplateTableHeading } from "@/constant/tableHeading"
import { SmsConfigAPI } from "@/service/SmsConfiguration/SmsConfigAPI"
import { useQuery } from "react-query"

export const SmsTemplate =()=>{
  const {
    SmsConfig, 
  } = new SmsConfigAPI();
  const { data, isLoading, refetch } = useQuery(["SmsConfig"], SmsConfig);
  console.log(data , "sms")
    return(
        <>
        <PageHeader title="Sms Template"/>
        <Breadcrumb currentPage={"Sms Template"} serachEnable />
        <BaseTable tableHeadings={smsTemplateTableHeading} onSmsConfigData={data}/>
      </>
    )
   
}