import Image from "next/image";
import { BaseUrls } from "../../../../../env";
import { Button } from "@/common/Button";
import { Formik } from "formik";
import { useState } from "react";

export const AnnouncementForm = ({ data, onUpdate, loading }) => {
  const [imageFile, setImageFile] = useState(null);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card p-5 mb-4 justify-content-fs">
              <Formik
                initialValues={{
                  image: null,
                  title: data?.title,
                  description: data?.description,
                  status: data?.status,
                  expired_date: data?.expired_date,
                }}
                onSubmit={(values, actions) => {
                  onUpdate({
                    image: imageFile || data?.image,
                    title: values?.title,
                    description: values?.description,
                    status: values?.status,
                    expired_date: values?.expired_date,
                  });

                  actions.setSubmitting(true);
                }}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <form>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value={values.status}
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        {values.status}
                      </label>
                    </div>
                    <label>Exisiting</label>
                    <div>
                      <Image
                        width={200}
                        height={200}
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
                      <label>Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Session Expired Data</label>
                      <input
                        type="number"
                        className="form-control"
                        name="expired_date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.expired_date}
                      />
                    </div>
                    <Button
                      name="Update"
                      bg="#23d24f"
                      type="submit"
                      color="#fff"
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
    </>
  );
};
