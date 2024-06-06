import { Button } from "@/common/Button";
import { Formik } from "formik";
import Image from "next/image";
import { BaseUrls } from "../../../../../env";
import { useState } from "react";

export const SubscriptionBannerForm = ({ data, onUpdate, loading }) => {
  const [imageFile, setImageFile] = useState(null);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={{
                image: null,
                title: data?.title,
                header: data?.header,
                status: data?.status,
              }}
              onSubmit={(values, actions) => {
                onUpdate({
                  image: imageFile || data?.image,
                  title: values?.title,
                  header: values?.header,
                  status: values?.status,
                });

                actions.setSubmitting(true);
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form>
                  <label>Exisiting Banner</label>
                  <div>
                    <Image
                      width={100}
                      height={100}
                      alt=""
                      src={
                        `${BaseUrls?.IMAGE_URL}/${data?.image}` ||
                        "/assets/img/placeholder.jpg"
                      }
                      className="text-secondary text-sm font-weight-bold product-image mb-3"
                    />
                  </div>
                  <div className="mb-3">
                    <label>New Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={(e) => {
                        const file = e?.currentTarget?.files[0];
                        setImageFile(file?.name);
                      }}
                      onBlur={handleBlur}
                      value={values.image}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Header</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="header"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.header}
                    />
                  </div>
                  <Button
                    name="Update"
                    bg="#23d24f"
                    type="submit"
                    color="#fff"
                    w="200"
                    onClick={handleSubmit}
                    isSubmitting={loading}
                  />
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};


