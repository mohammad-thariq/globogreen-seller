import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { localStorageConst, userData } from "@/constant/localStorage";
import { Redirect, Reload } from "@/helper/base";
import { AuthorizationApi } from "@/service/auth/auth";
import { LocalStorageHelper } from "@/utils/localStorage";
import { BaseUrls } from "../../../../env";

const BASE_URL = process.env.NEXT_SHOPOADMIN_BASE_URL;

const { login } = new AuthorizationApi();

export const handleLogin = async (data) => {
  const res = await login(data);
  if (res.error) {
    ToastifyFailed(`${res.error}`);
    Reload();
  } else {
    LocalStorageHelper?.setItem(localStorageConst?.JWTADMIN, res?.access_token);
    LocalStorageHelper?.setItem(localStorageConst.EXPIREIN, res?.expires_in);
    // LocalStorageHelper?.setItem(localStorageConst.REMEMBER, data?.rememberMe);
    const user = {
      id: res?.admin?.id,
      name: res?.admin?.name,
      email: res?.admin?.email,
      avatar: `${BASE_URL || BaseUrls.BASE_URL}/${res?.admin?.image}`,
    };
    LocalStorageHelper?.setItem(localStorageConst?.USER, user);
    ToastifySuccess(`Welcome Back ${user.name}`);
    Redirect("/");
  }
};
