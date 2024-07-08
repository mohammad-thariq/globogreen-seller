import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class MyShopAPI {
    myShop = async () => {
        const res = await _axios("get", `/my-profile?token=${getToken()}`);
        return res;
      };

      editMyShop = async (data) => {
        const res = await _axios("post", `/update-seller-profile?token=${getToken()}`, data, "multipart/form-data");
        return res;
      };
}

