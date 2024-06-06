import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class EmailConfigAPI {
    
    emailConfig = async () => {
        const res = await _axios("get", `/email-configuration?token=${getToken()}`);
        return res;
      };

      updateEmailConfig = async (data) => {
        const res = await _axios("put", `/update-email-configuraion?token=${getToken()}`,data);
        return res;
      };


      emailTemplate = async () => {
        const res = await _axios("get", `/email-template?token=${getToken()}`);
        return res;
      };

      getMainEmailTemplate = async ({queryKey}) =>{
        const res = await _axios("get", `/edit-email-template/${queryKey[1]}?token=${getToken()}`);
        return res;
      }

      updateEmailTemplate = async (data) => {
        const res = await _axios("put", `/update-email-template/${data.id}?token=${getToken()}`,data);
        return res;
      };

}