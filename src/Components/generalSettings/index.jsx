import { Breadcrumb } from "@/common/Breadcrumb";
import { PageHeader } from "@/common/PageHeader";
import { AppSetingAPI } from "@/service/appSettings/AppSettingAPI";
import { useQuery } from "react-query";
import { Settings } from "./components/settings";

export const GeneralSettings = () => {
  const { appSetting } = new AppSetingAPI();
  const { data, isLoading, refetch } = useQuery(["general-setting"], appSetting);
  return (
    <>
      <PageHeader title="General Setting" />
      <Breadcrumb currentPage={"General Setting"} serachEnable />
      <Settings onData={data}/>
    </>
  );
};
