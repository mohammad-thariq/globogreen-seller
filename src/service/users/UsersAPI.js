import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class UsersAPI {
  customer = async () => {
    const res = await _axios("get", `/customer-list?token=${getToken()}`);
    return res;
  };

  updateCustomerStatus = async (data) => {
    const res = await _axios(
      "post",
      `/customer-list/update-status?token=${getToken()}`,
      data
    );
    return res;
  };

  deleteCustomerList = async (data) => {
    const res = await _axios(
      "delete",
      `/customer-list/delete?token=${getToken()}`,
      data
    );
    return res;
  };

 pendingCustomer = async () => {
  const res = await _axios("get", `/pending-customer-list?token=${getToken()}`);
  return res;
};

  // seller Start

  sellerList = async () => {
    const res = await _axios("get", `/seller-list?token=${getToken()}`);
    return res;
  };

  updateSellerStatus = async (data) => {
    const res = await _axios(
      "post",
      `/seller-list/update-status/${data.id}?token=${getToken()}`,
      data
    );
    return res;
  };

  deleteSeller = async (data) => {
    const res = await _axios(
      "delete",
      `/seller-list/delete/${data.id}?token=${getToken()}`,
      data
    );
    return res;
  };
// pending Seller 
  pendingSeller = async () => { 
    const res = await _axios(
      "get",
      `/pending-seller-list?token?=${getToken()}`
    );
    return res;
  };

  deletePendingSeller = async (data) => {
    const res = await _axios(
      "delete",
      `/seller-list/delete/${data.id}?token=${getToken()}`,
      data
    );
    return res;
  };

}
