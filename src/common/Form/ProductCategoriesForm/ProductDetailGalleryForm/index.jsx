/* eslint-disable @next/next/no-img-element */
import { Button } from "@/common/Button";
import { useState } from "react";

export const ProductDetailGalleryForm = ({
  currentProductId,
  onLoading,
  onSave,
}) => {

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onSave({product_id: currentProductId, images: selectedFiles});
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 flex align-item-center justify-content-c">
            <p>New Image (Multiple)</p>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                name="images"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="flex ms-1">
              <Button
                name="Upload Gallery"
                color="#fff"
                bg="#23d24f"
                type="button"
                w="200px"
                icon="fa fa-plus"
                isSubmitting={onLoading}
                onClick={handleUpload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};