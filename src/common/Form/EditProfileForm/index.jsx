import { Button } from "@/common/Button";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export const EditProfileForm = ({ onData, loading, onUpdate }) => {
  const schema = Yup.object({
    name: Yup.string().required("Name is Reuired"),
    email: Yup.string().required("email is Reuired"),
    phone: Yup.number().required("Phone is Required"),
    address: Yup.string().required("Address is Required"),
  });
  const [imageFile, setImageFile] = useState(null);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={{
                image: null,
                name: onData?.user?.name || "",
                email: onData?.user?.email || "",
                phone: onData?.user?.phone || "",
                address: onData?.user?.address || "",
              }}
              validationSchema={schema}
              onSubmit={(values, actions) => {
                onUpdate({
                  image: values?.image,
                  name: values?.name,
                  email: values?.email,
                  phone: values?.phone,
                  address: values?.address,
                  country: null,
                  zip_code: null,
                });
                actions.setSubmitting(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form>
                  <div className="mb-3">
                    <label>New Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      onChange={(e) => {
                        const file = e?.currentTarget?.files[0];
                        setImageFile(file?.name);
                      }}
                      onBlur={handleBlur}
                      value={values.image}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.shop_name &&
                        touched.shop_name &&
                        errors.shop_name}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.phone && touched.phone && errors.phone}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.address && touched.address && errors.address}
                    </p>
                  </div>
                  <div className="flex justify-content-fs">
                    <Button
                      name="Update"
                      bg="#23d24f"
                      type="submit"
                      color="#fff"
                      w="100"
                      onClick={handleSubmit}
                      isSubmitting={loading}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
