import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN)
  return token
}

export class AppSetingAPI {
    appSetting = async () => {
        const res = await _axios("get", `/general-setting?token=${getToken()}`);
        return res;
      };

    updateSetting = async (data) => {
      const res = await _axios ('put', `/update-general-setting?token=${getToken()}`, data)
      return res
    }
}