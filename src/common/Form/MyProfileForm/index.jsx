import Image from "next/image";
import { BaseUrls } from "../../../../env";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const MyProfileForm = ({ data }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-3 mb-4 justify-content-fs">
            <div className="d-flex gap-3 justify-content-around">
              <div>
                <Image
                  width={100}
                  height={100}
                  alt=""
                  src={
                    `${BaseUrls?.IMAGE_URL}/${data?.user?.image}` ||
                    "/assets/img/placeholder.jpg"
                  }
                  className="text-secondary text-sm font-weight-bold product-image"
                />
              </div>
              <div>
                <label>Joined At</label>
                <>
                  <p>{data?.user?.created_at.slice(0, 10)}</p>
                </>
              </div>
              <div>
                <label>balance</label>
                <>
                  <p>{0}</p>
                </>
              </div>
            </div>
            <table className="table mt-5">
              <thead scope="col">
                <tr>
                  <td scope="row">Name</td>
                  <td >{data?.user?.name}</td>
                </tr>
                <tr>
                  <td scope="row">Email</td>
                  <td >{data?.user?.email}</td>
                </tr>
                <tr>
                  <td scope="row">Phone</td>
                  <td >{data?.user?.phone}</td>
                </tr>
                <tr>
                  <td scope="row">User Status</td>
                  <td > <ProductStatus status={data?.user?.status} /></td>
                </tr>
                <tr>
                  <td scope="row">Shop Status</td>
                  <td > <ProductStatus status={data?.seller?.status} /></td>
                </tr>
              </thead>
             
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
