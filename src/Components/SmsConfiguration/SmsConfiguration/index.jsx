import { Breadcrumb } from "@/common/Breadcrumb"
import { SmsConfigForm } from "@/common/Form/SmsConfigForm"
import { PageHeader } from "@/common/PageHeader"
import { SmsConfigAPI } from "@/service/SmsConfiguration/SmsConfigAPI"
import { useQuery } from "react-query"

export const SmsConfiguration =()=>{
  const {SmsConfig} = new SmsConfigAPI()
  const {data, isLoading} = useQuery(['smsConfig'], SmsConfig)
  console.log(data, 'data');
    return(
        <>
        <PageHeader title="Sms Configuration"/>
        <Breadcrumb currentPage={"Sms Configuration"} serachEnable />
        <SmsConfigForm/>
       
      </>
    )
   
}