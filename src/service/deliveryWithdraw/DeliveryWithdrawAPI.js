import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class DeliveryWithdrawAPI {
  pendingWithdraw = async () => {
    const res = await _axios("get", `/pending-delivery-man-withdraw?token=${getToken()}`);
    return res;
  };
  withdraw = async () => {
    const res = await _axios(
      "get",
      `/delivery-man-withdraw?token=${getToken()}`
    );
    return res;
  };

  withdrawDelete = async (data) => {
    const res = await _axios(
      "delete",
      `/delete-delivery-man-withdraw?token=${getToken()}`,
      data
    );
    return res;
  };

  withdrawMethod = async () => {
    const res = await _axios(
      "get",
      `/delivery-man-withdraw-method?token=${getToken()}`
    );
    return res;
  };

  CreateWithdrawMethod = async (data) => {
    const res = await _axios(
      "post",
      `/delivery-man-withdraw-method/store?token=${getToken()}`,
      data
    );
    return res;
  };

  UpdateWithdrawMethod = async (data) => {
    const res = await _axios(
      "post",
      `/delivery-man-withdraw-method/update?token=${getToken()}`,
      data
    );
    return res;
  };

  DeleteWithdrawMethod = async (data) => {
    const res = await _axios(
      "delete",
      `/delivery-man-withdraw-method/delete?token=${getToken()}`,
      data
    );
    return res;
  };
}
