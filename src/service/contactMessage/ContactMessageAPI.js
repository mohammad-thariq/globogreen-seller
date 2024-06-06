import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN)
  return token
}

export class ContactMessageAPI {
    contactMessage = async () => {
        const res = await _axios("get", `/contact-message?token=${getToken()}`);
        return res;
      };

      deleteContactMessage = async (data) => {
        const res = await _axios("delete", `/delete-contact-message/${data.id}?token=${getToken()}`, data);
        return res;
      };
}
