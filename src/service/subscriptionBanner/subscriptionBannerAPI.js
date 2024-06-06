import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class subscriptionBannerAPI {
    Subscriptionbanner = async () => {
        const res = await _axios("get", `/subscription-banner?token=${getToken()}`);
        return res;
      };
     
      updateSubscriptionbanner = async (data) => {
        const res = await _axios("post", `/update-subscription-banner?token=${getToken()}`,data);
        return res;
      };
}