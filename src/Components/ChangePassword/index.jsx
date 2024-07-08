import { Breadcrumb } from "@/common/Breadcrumb";
import { ChangePasswordForm } from "@/common/Form/ChangePasswordForm";
import { PageHeader } from "@/common/PageHeader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { localStorageConst } from "@/constant/localStorage";
import { Reload } from "@/helper/base";
import { changePasswordAPI } from "@/service/changepassword";
import { LocalStorageHelper } from "@/utils/localStorage";
import { useMutation } from "react-query";

export const ChangePassword = () => {
  const { changePassword } = new changePasswordAPI();

  const {
    mutate: updateChangePasswordMutate,
    isLoading: updateChangePasswordLoading,
  } = useMutation(changePassword, {
    onSuccess: (data, variables, context) => {
      ToastifySuccess(data?.notification);
      LocalStorageHelper.removeItem(localStorageConst.JWTADMIN)
      LocalStorageHelper.removeItem(localStorageConst.USER)
      Reload()
    },
    onError: (data, variables, context) => {
      ToastifyFailed(data?.notification);
      refetch();
    },
  });

  return (
    <>
      <PageHeader title="Change Password" />
      <Breadcrumb currentPage={"Change Password"} serachEnable />
      <ChangePasswordForm
        onUpdate={updateChangePasswordMutate}
        loading={updateChangePasswordLoading}
      />
    </>
  );
};
