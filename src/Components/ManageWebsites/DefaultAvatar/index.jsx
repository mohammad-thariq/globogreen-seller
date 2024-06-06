import { Breadcrumb } from "@/common/Breadcrumb";
import { DefaultAvatarForm } from "@/common/Form/ManageWebsitesForm/DefaultAvatarForm";
import { PageHeader } from "@/common/PageHeader";
import { ManageWebsitesAPI } from "@/service/manageWebsites/ManageWebsitesAPI";
import { useQuery } from "react-query";

export const DefaultAvatar = () => {
  
  const { defaultAvatar, UpdateHomepageTitle } = new ManageWebsitesAPI();
  const { data, isLoading, refetch } = useQuery(
    ["defaultAvatar"],
    defaultAvatar
  );

  console.log(data, "pic Data")
  return (
    <>
      <PageHeader title="Default Avatar" />
      <Breadcrumb currentPage={"Default Avatar"} serachEnable />
      <DefaultAvatarForm data={data}/>
    </>
  );
};
