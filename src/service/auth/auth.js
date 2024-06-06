import { _axios } from "@/helper/axios";

export class AuthorizationApi {
  login = async (data) => {
    const res = await _axios("post", "/login", data, "multipart/form-data");
    return res;
  };
}
