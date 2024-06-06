/* eslint-disable @next/next/no-img-element */
import { Button } from "@/common/Button";

export const ImportFiles = ({ name }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 flex align-item-center justify-content-c">
            <p>{name}</p>
            <div className="mb-3">
              <input type="file" className="form-control" name="image" />
            </div>
            <div className="flex ms-1">
              <Button
                name="Upload File"
                color="#fff"
                bg="#23d24f"
                type="button"
                w="200px"
                icon="fa fa-plus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
