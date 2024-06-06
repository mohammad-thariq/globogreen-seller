import { Breadcrumb } from "@/common/Breadcrumb";
import { SubscriptionBannerForm } from "@/common/Form/ManageWebsitesForm/SubscriptionBannerForm";
import { Loader } from "@/common/Loader";
import { PageHeader } from "@/common/PageHeader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { subscriptionBannerAPI } from "@/service/subscriptionBanner/subscriptionBannerAPI";
import { useMutation, useQuery } from "react-query";

export const SubscriptionBanner = () => {
  const { Subscriptionbanner, updateSubscriptionbanner } =
    new subscriptionBannerAPI();
  const { data, isLoading, refetch } = useQuery(
    ["Subscriptionbanner"],
    Subscriptionbanner
  );

  const {
    mutate: updateSubscriptionbannerMutate,
    isLoading: updateSubscriptionbannerLoading,
  } = useMutation(updateSubscriptionbanner, {
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
      <PageHeader title="Subscription Banner" />
      <Breadcrumb currentPage={"Subscription Banner"} serachEnable />
      {data && (
        <SubscriptionBannerForm
          data={data?.subscription_banner}
          onUpdate={updateSubscriptionbannerMutate}
          loading={updateSubscriptionbannerLoading}
        />
      )}
    </>
  );
};
