import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class withdrawAPI {
  // Withdraw Method
  withdrawAccount = async () => {
    const res = await _axios("get", `/my-withdraw?token=${getToken()}`);
    return res;
  };

  withdrawAccountInfo = async (data) => {
    const res = await _axios(
      "get",
      `/get-withdraw-account-info/${data.id}?token=${getToken()}`
    );
    return res;
  };

  createWithdraw = async (data) => {
    const res = await _axios("post", `/my-withdraw?token=${getToken()}`, data);
    return res;
  };
}
