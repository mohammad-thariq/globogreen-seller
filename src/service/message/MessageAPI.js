import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class MessageAPI {
    messageList = async () => {
        const res = await _axios("get", `/message-customer-list?token=${getToken()}`);
        return res;
      };
}