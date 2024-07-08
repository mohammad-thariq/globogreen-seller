import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class MyProfileAPI {
    listMyProfile = async () => {
        const res = await _axios("get", `/my-profile?token=${getToken()}`);
        return res;
      };

      editMyProfile = async (data) => {
        const res = await _axios("post", `/update-seller-profile?token=${getToken()}`,data);
        return res;
      };
}