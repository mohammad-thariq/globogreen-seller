import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { PageHeader } from "@/common/PageHeader";
import { ManageWebsitesAPI } from "@/service/manageWebsites/ManageWebsitesAPI";
import { homePageSessionTableHeading } from "@/constant/tableHeading";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { Popup } from "@/common/Popup";
import { HomePageSessionForm } from "@/common/Form/ManageWebsitesForm/HomePageSessionForm";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";

export const HomePageTitle = () => {
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);
  const [currentHomePageData, setCurrentHomePageData] = useState(null);
  const { homepageTitle, UpdateHomepageTitle } = new ManageWebsitesAPI();
  const { data, isLoading, refetch } = useQuery(
    ["homepageTitle"],
    homepageTitle
  );
  console.log(data, "Home Page");

  const {
    mutate: updateHomePageTitleMutate,
    isLoading: updateHomePageTitleLoading,
  } = useMutation(UpdateHomepageTitle, {
    onSuccess: (data, variables, context) => {
      setOpenUpdatePopup(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenUpdatePopup(true);
      ToastifyFailed(data?.notification);
      refetch();
    },
  });

  const handleUpdatePageTitle = (key) => {
    setCurrentKey(key);
    const getCurrentPageTitle = data?.sections?.find((i) => i?.key === key);
    setCurrentHomePageData(getCurrentPageTitle);
    setOpenUpdatePopup(!openUpdatePopup);
  };
  return (
    <>
      <PageHeader title="HomePageTitle" />
      <Breadcrumb currentPage={"HomePageTitle"} serachEnable />
      <BaseTable
        tableHeadings={homePageSessionTableHeading}
        onHomepageTitleData={data}
        onUpdate={handleUpdatePageTitle}
      />
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdatePageTitle}>
          <HomePageSessionForm
            onClose={handleUpdatePageTitle}
            button="Update"
            currentKey={currentKey}
            data={currentHomePageData}
            onUpdate={updateHomePageTitleMutate}
            loading={updateHomePageTitleLoading}
          />
        </Popup>
      )}
    </>
  );
};
