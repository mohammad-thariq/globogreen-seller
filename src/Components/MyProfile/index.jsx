import { Breadcrumb } from "@/common/Breadcrumb";
import { EditProfileForm } from "@/common/Form/EditProfileForm";
import { MyProfileForm } from "@/common/Form/MyProfileForm";
import { MyProfileData } from "@/constant/DashBoardConst";
import { MyProfileAPI } from "@/service/myProfile/MyProfileAPI";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { TrackingCard } from "../DashboardPanel/TrackingCard";
import { Loader } from "@/common/Loader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";

export const MyProfile = () => {
  const { listMyProfile, editMyProfile } = new MyProfileAPI();
  const [trackingCardData, setTrackingCardData] = useState(null);
  const { data, isLoading, refetch } = useQuery(
    ["listMyProfile"],
    listMyProfile
  );

  console.log(data, "myyyyy");

  const { mutate: updateMyProfileMutate, isLoading: updateMyProfileLoading } =
    useMutation(editMyProfile, {
      onSuccess: (data, variables, context) => {
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        ToastifyFailed(data?.message);
      },
    });

  const updateTrackingCardData = useCallback(() => {
    if (data) {
      const updatedTrackingCardData = MyProfileData.profileDataCard.map(
        (item) => ({
          ...item,
          count: data[item.countKey] ?? 0,
        })
      );
      setTrackingCardData(updatedTrackingCardData);
    }
  }, [data]);

  useEffect(() => {
    updateTrackingCardData();
  }, [updateTrackingCardData]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Breadcrumb currentPage={"My Profile"} serachEnable />
      <div className="container-fluid py-4">
        <div className="row mb-5">
          {trackingCardData?.map((i) => (
            <TrackingCard key={i?.id} {...i} />
          ))}
        </div>
      </div>
      <div className="profile-box gap-3 container-fluid">
        {data && <MyProfileForm data={data} />}
        {data && (
          <EditProfileForm
            onData={data}
            onUpdate={updateMyProfileMutate}
            loading={updateMyProfileLoading}
          />
        )}
      </div>
    </>
  );
};
