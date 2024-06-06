import { Breadcrumb } from "@/common/Breadcrumb";
import { MaintainanceModeForm } from "@/common/Form/ManageWebsitesForm/MaintainanceModeForm";
import { Loader } from "@/common/Loader";
import { PageHeader } from "@/common/PageHeader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { ManageWebsitesAPI } from "@/service/manageWebsites/ManageWebsitesAPI";
import { useMutation, useQuery } from "react-query";

export const MaintainanceMode = () => {

  const { maintainanceMode, updateMaintainanceMode } = new ManageWebsitesAPI();
  const { data, isLoading, refetch } = useQuery(
    ["maintainanceMode"],
    maintainanceMode
  );

  const {
    mutate: updateMaintainanceMutate,
    isLoading: updateMaintainanceLoading,
  } = useMutation(updateMaintainanceMode, {
    onSuccess: (data, variables, context) => {
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      ToastifyFailed(data?.message);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="MaintainanceMode" />
      <Breadcrumb currentPage={"MaintainanceMode"} serachEnable />
      
      {data && (
        <MaintainanceModeForm
          data={data?.maintainance}
          onUpdate={updateMaintainanceMutate}
          loading={updateMaintainanceLoading}
        />
      )}

    </>
  );
};
