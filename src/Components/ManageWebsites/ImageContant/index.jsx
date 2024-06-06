import { Breadcrumb } from "@/common/Breadcrumb";
import { ImageContantForm } from "@/common/Form/ManageWebsitesForm/ImageContantForm";
import { PageHeader } from "@/common/PageHeader";
import { ManageWebsitesAPI } from "@/service/manageWebsites/ManageWebsitesAPI";
import { useQuery } from "react-query";

export const ImageContant = () => {
  const { imageContant, UpdateImageContant } =
    new ManageWebsitesAPI();
  const { data, isLoading, refetch } = useQuery(
    ["imageContant"],
    imageContant
  );
  return (
    <>
      <PageHeader title="ImageContant" />
      <Breadcrumb currentPage={"ImageContant"} serachEnable />
      {data && <ImageContantForm data={data?.image_content}/>}
    </>
  );
};
