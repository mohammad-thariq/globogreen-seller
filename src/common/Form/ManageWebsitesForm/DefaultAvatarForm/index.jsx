import Image from "next/image";
import { BaseUrls } from "../../../../../env";
import { Button } from "@/common/Button";

export const DefaultAvatarForm = ({ data }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card p-5 mb-4 justify-content-fs">
              <Image
                width={70}
                height={70}
                alt=""
                src={
                  `${BaseUrls?.IMAGE_URL}/${data?.defaultProfile?.image}` ||
                  "/assets/img/placeholder.jpg"
                }
                className="text-secondary text-sm font-weight-bold product-image rounded-circle mb-3"
              />
              <div className="mb-3">
                <label>Avatar</label>
                <input type="file" className="form-control" name="image" />
              </div>
              <Button name="Update" bg="#23d24f"
                type="submit"
                color="#fff"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
