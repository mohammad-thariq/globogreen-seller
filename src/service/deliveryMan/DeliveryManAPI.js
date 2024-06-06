import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class DeliveryManAPI {
  deliveryMan = async () => {
    const res = await _axios("get", `/delivery-man?token=${getToken()}`);
    return res;
  };
  createDeliveryMan = async (data) => {
    const res = await _axios(
      "post",
      `/delivery-man/store?token=${getToken()}`,
      data
    );
    return res;
  };

  updateDeliveryMan = async (data) => {
    const res = await _axios(
      "post",
      `/delivery-man/update?token=${getToken()}`,
      data
    );
    return res;
  };

  deleteDeliveryMan = async (data) => {
    const res = await _axios(
      "delete",
      `/delivery-man/delete?token=${getToken()}`,
      data
    );
    return res;
  };

  recevieAmount = async () => {
    const res = await _axios(
      "get",
      `/delivery-man-order-amount?token=${getToken()}`
    );
    return res;
  };

  createRecevieAmount = async (data) =>{
    const res = await _axios(
      "post",
      `/delivery-man-order-amount/store?${getToken()}`,
      data
    );
    return res;
  }

  deleteRecevieAmount = async () =>{
    const res = await _axios(
      "delete",
      `/delete-delivery-order-amount?${getToken()}`,
      data
    );
    return res;
  }

  review = async () => {
    const res = await _axios("get", `/delivery-man-review?token=${getToken()}`);
    return res;
  };

  updateReview = async (data) => {
    const res = await _axios(
      "post",
      `/delivery-man-review-status?token=${getToken()}`,
      data
    );
    return res;
  };

  DeleteReview = async (data) => {
    const res = await _axios(
      "delete",
      `/delete-delivery-man-review?token=${getToken()}`,
      data
    );
    return res;
  };
}
