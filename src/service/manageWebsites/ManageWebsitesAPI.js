import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class ManageWebsitesAPI {
    // Sliders
    slider = async () => {
        const res = await _axios("get", `/slider?token=${getToken()}`);
        return res;
      };

      createSlider = async (data) => {
        const res = await _axios(
          "post",
          `/slider?token=${getToken()}`,
          data
        );
        return res;
      };

     updateSlider = async (data) => {
        const res = await _axios(
          "post",
          `/slider?token=${getToken()}`,
          data
        );
        return res;
      };
      deleteSlider = async (data) => {
        const res = await _axios(
          "delete",
          `/slider/${data.id}?token=${getToken()}`,
          data
        );
        return res;
      };

      // Service
      service = async () => {
        const res = await _axios("get", `/service?token=${getToken()}`);
        return res;
      };

      createService = async (data) => {
        const res = await _axios("post", `/service?token=${getToken()}`,data);
        return res;
      };

      UpdateService = async (data) => {
        const res = await _axios("put", `/service/${data.id}?token=${getToken()}`,data);
        return res;
      };

      deleteService =async (data) => {
        const res = await _axios("delete", `/service/${data.id}?token=${getToken()}`,data);
        return res;
      };

      // Home Page session Title

      homepageTitle = async () => {
        const res = await _axios("get", `/homepage-section-title?token=${getToken()}`);
        return res;
      };

      UpdateHomepageTitle = async (data) => {
        const res = await _axios("post", `/update-homepage-section-title?token=${getToken()}`,data);
        return res;
      };

      // Default Avatar

      defaultAvatar = async () => {
        const res = await _axios("get", `/default-avatar?token=${getToken()}`);
        return res;
      };

      //  maintainance-mode

      maintainanceMode = async () => {
        const res = await _axios("get", `/maintainance-mode?token=${getToken()}`);
        return res;
      };

      updateMaintainanceMode = async (data) => {
        const res = await _axios("post", `/maintainance-mode-update?token=${getToken()}`,data);
        return res;
      };


      // Announcement

      announcement = async () => {
        const res = await _axios("get", `/announcement?token=${getToken()}`);
        return res;
      };

      UpdateAnnouncement = async (data) => {
        const res = await _axios("post", `/announcement-update?token=${getToken()}`,data);
        return res;
      };

      // Image Contant

      imageContant = async () => {
        const res = await _axios("get", `/image-content?token=${getToken()}`);
        return res;
      };

      UpdateImageContant = async (data) => {
        const res = await _axios("post", `/update-image-content?token=${getToken()}`,data);
        return res;
      };






}