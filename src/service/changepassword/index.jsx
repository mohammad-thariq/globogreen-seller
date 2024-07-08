import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class changePasswordAPI {
    changePassword = async (data) =>{
        const res = await _axios("put" ,`/password-update?token=${getToken()}`, data);
        return res;
    }
}