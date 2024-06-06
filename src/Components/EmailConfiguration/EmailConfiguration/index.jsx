import { Breadcrumb } from "@/common/Breadcrumb";
import { EmailConfigForm } from "@/common/Form/EmailConfigForm";
import { Loader } from "@/common/Loader";
import { PageHeader } from "@/common/PageHeader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { EmailConfigAPI } from "@/service/emailConfiguration/EmailConfigAPI";
import { useMutation, useQuery } from "react-query";

export const EmailConfiguration = () => {
  const { emailConfig, updateEmailConfig } = new EmailConfigAPI();

  const { data, isLoading, refetch } = useQuery(["emailConfig"], emailConfig);

  const {
    mutate: updateEmailConfigMutate,
    isLoading: updateEmailConfigLoading,
  } = useMutation(updateEmailConfig, {
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
      <PageHeader title="Email Configuration" />
      <Breadcrumb currentPage={"Email Configuration"} serachEnable />
      {data && <EmailConfigForm
        onData={data?.email}
        onUpdate={updateEmailConfigMutate}
        loading={updateEmailConfigLoading}
      />
}
    </>
  );
};
