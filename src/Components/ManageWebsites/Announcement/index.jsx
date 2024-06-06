import { Breadcrumb } from "@/common/Breadcrumb";
import { AnnouncementForm } from "@/common/Form/ManageWebsitesForm/AnnouncementForm";
import { Loader } from "@/common/Loader";
import { PageHeader } from "@/common/PageHeader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { ManageWebsitesAPI } from "@/service/manageWebsites/ManageWebsitesAPI";
import { useMutation, useQuery } from "react-query";

export const Announcement = () => {
  const { announcement, UpdateAnnouncement } = new ManageWebsitesAPI();
  const { data, isLoading, refetch } = useQuery(["announcement"], announcement);

  const {
    mutate: updateAnnouncementMutate,
    isLoading: updateAnnouncementLoading,
  } = useMutation(UpdateAnnouncement, {
    onSuccess: (data, variables, context) => {
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      ToastifyFailed(data?.notification);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="Announcement" />
      <Breadcrumb currentPage={"Announcement"} serachEnable />
      {data && (
        <AnnouncementForm
          data={data?.announcement}
          onUpdate={updateAnnouncementMutate}
          loading={updateAnnouncementLoading}
        />
      )}
    </>
  );
};
