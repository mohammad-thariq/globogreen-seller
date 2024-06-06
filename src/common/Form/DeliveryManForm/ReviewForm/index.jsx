import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { statusConstantOption} from "@/constant/statusConst";
import { useState } from "react";
import { InputSelect } from "../../common/inputSelect";

export const ReviewForm = ({
  onSave,
  onClose,
  currentCountryId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const schema = Yup.object({
    status: Yup.string().required("Status is Required"),
  });
  console.log(data, "data this");
  const [imageFile, setImageFile] = useState(null);
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          status: data?.status + 1 || "", 
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentCountryId,
                status: values?.status - 1,
              })
            : onSave({
                status: values?.status - 1,
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
            				Status	Action
            <label>Delivery man</label>
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
            <label>Customer</label>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Customer"
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
            <label>Order id</label>
            <div className="mb-3">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Order id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            <label>Review</label>
            <div className="mb-3">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Review"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            
            <label>Rating</label>
            <div className="mb-3">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Rating"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.name && touched.name && errors.name}
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
