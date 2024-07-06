import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class StockHistoryAPI {
    getStockHistory = async ({queryKey}) => {
        const res = await _axios("get", `/stock-history/${queryKey[1]}?token=${getToken()}`);
        return res;
      };

      addStockHistory = async (data) => {
        const res = await _axios("post", `/add-stock?token=${getToken()}`, {...data});
        return res;
      };

      deleteStockHistory = async (data) => {
        const res = await _axios("delete", `/delete-stock/${data.id}?token=${getToken()}`);
        return res;
      };

}