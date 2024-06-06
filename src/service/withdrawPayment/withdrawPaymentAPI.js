import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class withdrawPaymentAPI {
  // Withdraw Method
  withdrawMethod = async () => {
    const res = await _axios("get", `/withdraw-method?token=${getToken()}`);
    return res;
  };

  createWithdrawMethod = async (data) => {
    const res = await _axios(
      "post",
      `/withdraw-method/create?token=${getToken()}`,
      data
    );
    return res;
  };

  updateWithdrawMethod = async (data) => {
    const res = await _axios(
      "post",
      `/withdraw-method/update?token=${getToken()}`,
      data
    );
    return res;
  };

  deleteWithdrawMethod = async (data) => {
    const res = await _axios(
      "delete",
      `/withdraw-method/delete?token=${getToken()}`,
      data
    );
    return res;
  };

  //   seller Withdraw

  sellerWithdraw = async () => {
    const res = await _axios("get", `/seller-withdraw?token=${getToken()}`);
    return res;
  };

  sellerWithdrawShow = async () => {
    const res = await _axios(
      "get",
      `/seller-withdraw/show?token=${getToken()}`
    );
    return res;
  };

  updateSellerWithdraw = async (data) => {
    const res = await _axios(
      "post",
      `/seller-withdraw/approved?token=${getToken()}`,
      data
    );
    return res;
  };

  deleteSellerWithdraw = async (data) => {
    const res = await _axios(
      "delete",
      `/seller-withdraw/delete?token=${getToken()}`,
      data
    );
    return res;
  };

  //Pending Seller

  pendingSeller = async () => {
    const res = await _axios(
      "get",
      `/pending-seller-withdraw?token=${getToken()}`
    );
    return res;
  };

  deletePendingSeller = async (data) => {
    const res = await _axios(
      "delete",
      `/seller-withdraw/delete${getToken()}`,
      data
    );
    return res;
  };
}
