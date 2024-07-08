import { Button } from "@/common/Button";
import { Formik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { BaseUrls } from "../../../../env";
import { useState } from "react";

export const MyShopForm = ({ data, loading, onUpdate }) => {
  const schema = Yup.object({
    shop_name: Yup.string().required("Shop Name is Reuired"),
    email: Yup.string().required("email is Reuired"),
    phone: Yup.number().required("Phone is Required"),
    open_at: Yup.string().required("Open At is Required"),
    closed_at: Yup.string().required("Closed At is Required"),
    address: Yup.string().required("Address is Required"),
    greeting_msg: Yup.string().required("Greeting Message is Required"),
    seo_title: Yup.string().required("Seo Title is Required"),
    seo_description: Yup.string().required("Seo Description is Required"),
  });
  console.log(data?.seller?.phone, "myshopForm");

  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={{
                logo: null,
                banner_image: null,
                shop_name: data?.seller?.shop_name || "",
                email: data?.seller?.email || "",
                phone: data?.seller?.phone || "",
                open_at: data?.seller?.open_at || "",
                closed_at: data?.seller?.closed_at || "",
                address: data?.seller?.address || "",
                greeting_msg: data?.seller?.greeting_msg || "",
                seo_title: data?.seller?.seo_title || "",
                seo_description: data?.seller?.seo_description || "",
              }}
              validationSchema={schema}
              onSubmit={(values, actions) => {
                onUpdate({
                  logo: values?.logo,
                  banner_image: values?.banner_image,
                  shop_name: values?.shop_name,
                  email: values?.email,
                  phone: values?.phone,
                  open_at: values?.open_at,
                  closed_at: values?.closed_at,
                  address: values?.address,
                  greeting_msg: values?.greeting_msg,
                  seo_title: values?.seo_title,
                  seo_description: values?.seo_description,
                  country: "india",
                  zipcode: "607003",
                  first_name: "mohan",
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
                  <label>Current Logo</label>
                  <div>
                    <Image
                      width={100}
                      height={100}
                      alt=""
                      src={
                        `${BaseUrls?.IMAGE_URL}/${data?.seller?.logo}` ||
                        "/assets/img/placeholder.jpg"
                      }
                      className="text-secondary text-sm font-weight-bold product-image"
                    />
                  </div>
                  <div className="mb-3">
                    <label>New Logo</label>
                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      onChange={(e) => {
                        const file = e?.currentTarget?.files[0];
                        setImageFile(file?.name);
                      }}
                      onBlur={handleBlur}
                      value={values.logo}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Current banner Image</label>
                    <br />
                    <Image
                      width={100}
                      height={100}
                      alt=""
                      src={
                        `${BaseUrls?.IMAGE_URL}/${data?.seller?.banner_image}` ||
                        "/assets/img/placeholder.jpg"
                      }
                      className="text-secondary text-sm font-weight-bold product-image"
                    />
                  </div>

                  <div className="mb-3">
                    <label>New Banner Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      onChange={(e) => {
                        const file = e?.currentTarget?.files[0];
                        setBannerFile(file?.name);
                      }}
                      onBlur={handleBlur}
                      value={values.banner_image}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Shop Name</label>
                    <input
                      type="text"
                      name="shop_name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shop_name}
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
                    <label>Opens at</label>
                    <input
                      type="text"
                      name="open_at"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.open_at}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.open_at && touched.open_at && errors.open_at}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Close at</label>
                    <input
                      type="text"
                      name="closed_at"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.closed_at}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.closed_at &&
                        touched.closed_at &&
                        errors.closed_at}
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
                  <div className="mb-3">
                    <label>Greeting Message for chatbox</label>
                    <input
                      type="text"
                      name="greeting_msg"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.greeting_msg}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.greeting_msg &&
                        touched.greeting_msg &&
                        errors.greeting_msg}
                    </p>
                  </div>
                  {/* <div className="mb-3 d-flex gap-5 ">
                    <div className="w-100">
                      <label>Social Icon</label>
                      <input
                        type="password"
                        name="smtp_password"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.smtp_password}
                      />
                    </div>
                    <div className="w-100">
                      <label>Social Link</label>
                      <input
                        type="password"
                        name="smtp_password"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.smtp_password}
                      />
                    </div>
                  </div> */}

                  <div className="mb-3">
                    <label>Seo Title</label>
                    <input
                      type="text"
                      name="seo_title"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.seo_title}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.seo_title &&
                        touched.seo_title &&
                        errors.seo_title}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Seo Description</label>
                    <textarea
                      type="text"
                      name="seo_description"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.seo_description}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.seo_description &&
                        touched.seo_description &&
                        errors.seo_description}
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
