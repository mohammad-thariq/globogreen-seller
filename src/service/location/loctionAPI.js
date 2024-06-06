import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class locationAPI {
  // -------------------country start------------------------

  country = async () => {
    const res = await _axios("get", `/country?token=${getToken()}`);
    return res;
  };

  createCountryLocation = async (data) => {
    const res = await _axios(
      "post",
      `/country/store?token=${getToken()}`,
      data
    );
    return res;
  };
  updateCountryLocation = async (data) => {
    const res = await _axios(
      "post",
      `/country/update?token=${getToken()}`,
      data
    );
    return res;
  };
  updateCountryStatusLocation = async (data) => {
    const res = await _axios(
      "post",
      `/country/status?token=${getToken()}`,
      data
    );
    return res;
  };
  deleteCountryLocation = async (data) => {
    const res = await _axios(
      "delete",
      `/country/delete?token=${getToken()}`,
      data
    );
    return res;
  };

  // -------------------country end------------------------
  // -------------------state start------------------------
  state = async () => {
    const res = await _axios("get", `/state?token=${getToken()}`);
    return res;
  };

  createStateLocation = async (data) => {
    const res = await _axios("post", `/state/store?token=${getToken()}`, data);
    return res;
  };
  updateStateLocation = async (data) => {
    const res = await _axios("post", `/state/update?token=${getToken()}`, data);
    return res;
  };
  updateStateStatusLocation = async (data) => {
    const res = await _axios("post", `/state/status?token=${getToken()}`, data);
    return res;
  };
  deleteStateLocation = async (data) => {
    const res = await _axios(
      "delete",
      `/state/delete?token=${getToken()}`,
      data
    );
    return res;
  };

  // -------------------state end------------------------
  // -------------------city start------------------------

  city = async () => {
    const res = await _axios("get", `/city?token=${getToken()}`);
    return res;
  };

  createCityLocation = async (data) => {
    const res = await _axios("post", `/city/store?token=${getToken()}`, data);
    return res;
  };
  updateCityLocation = async (data) => {
    const res = await _axios("post", `/city/update?token=${getToken()}`, data);
    return res;
  };
  updateCityStatusLocation = async (data) => {
    const res = await _axios("post", `/city/status?token=${getToken()}`, data);
    return res;
  };
  deleteCityLocation = async (data) => {
    const res = await _axios(
      "delete",
      `/city/delete?token=${getToken()}`,
      data
    );
    return res;
  };
  // -------------------city end------------------------
}
