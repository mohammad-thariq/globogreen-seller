import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { statusConstantOption } from "@/constant/statusConst";
import { useState } from "react";
import { InputSelect } from "../../common/inputSelect";

export const DeliveryManForm = ({
  onSave,
  onClose,
  currentDeliveryManId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const schema = Yup.object({
    man_image: Yup.string().required("Man Image is Required"),
    fname: Yup.string().required("First Name is Required"),
    email: Yup.string().required("Email is Required"),
    // total_order : Yup.string().required("Total Order is Required"),
    status: Yup.string().required("Status is Required"),
  });
  console.log(data, "data this");
  const [imageFile, setImageFile] = useState(null);
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          man_image: data?.man_image || "",
          fname: data?.fname || "",
          email: data?.email || "",
          total_order: data?.total_order || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentDeliveryManId,
                man_image: imageFile || data?.man_image,
                fname: values?.fname,
                email: values?.email,
                total_order: values?.total_order,
                status: values?.status - 1,
                lname: "",
                phone: "",
                man_type: " ",
                idn_type: "",
                idn_num: "",
              }) 
            : onSave({
                man_image: imageFile || data?.man_image,
                fname: values?.fname,
                email: values?.email,
                total_order: values?.total_order,
                status: values?.status - 1,
                lname: "",
                phone: "",
                man_type: " ",
                idn_type: "",
                idn_num: "",
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
          <form role="form" className="w-350">
            <div className="mb-3">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e) => {
                  const file = e?.currentTarget?.files[0];
                  setImageFile(file?.name);
                }}
                onBlur={handleBlur}
                value={values.logo}
              />
              {/* <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.logo && touched.logo && errors.logo}
              </p> */}
            </div>
            <label>First Name</label>
            <div className="mb-3">
              <input
                type="name"
                name="fname"
                className="form-control"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fname}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.fname && touched.fname && errors.fname}
              </p>
            </div>
            <label>Email</label>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <label>Total Order</label>
            <div className="mb-3">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Total Order"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.total_order}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.total_order &&
                  touched.total_order &&
                  errors.total_order}
              </p>
            </div>

            <InputSelect
              label={"Status"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"status"}
              values={values?.status}
              isValue
              onData={statusConstantOption}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.status && touched.status && errors.status}
            </p>
            <div className={style.btnWrapper}>
              <Button
                name="Close"
                border="1px solid #23D24F"
                color="#000"
                onClick={() => onClose()}
              />
              <Button
                name={button}
                bg="#23d24f"
                type="submit"
                color="#fff"
                onClick={handleSubmit}
                isSubmitting={loading}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
