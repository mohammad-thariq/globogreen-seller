import { Button } from "@/common/Button";
import style from "../../DeliveryManForm/index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { statusConstantOption } from "@/constant/statusConst";
import { InputSelect } from "../../common/inputSelect";
import { useState } from "react";

export const SliderForm = ({
  onSave,
  onClose,
  currentSliderId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const schema = Yup.object({
    status: Yup.string().required("Status is Required"),
  });
  const [imageFile, setImageFile] = useState(null);
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          image: null,
          status: data?.status - 1,
          badge: data?.badge,
          title_one: data?.title_one,
          title_two: data?.title_two,
          serial: data?.serial,
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentSliderId,
                image: imageFile || data?.image,
                status: values.status - 1,
                badge: values.badge,
                title_one: values.title_one,
                title_two: values.title_two,
                serial: values.serial,
                slider_location: null,
                product_slug: "fantech-octane-headset",
              })
            : onSave({
                image: imageFile,
                status: values?.status - 1,
                image: imageFile || data?.image,
                badge: values.badge,
                title_one: values.title_one,
                title_two: values.title_two,
                serial: values.serial,
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
          <form className="formInner overflow-column height-350">
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
                value={values.image}
              />
            </div>

            <div className="mb-3">
              <label>Serial</label>
              <input
                type="number"
                className="form-control"
                name="serial"
                onChange={onchange}
                onBlur={handleBlur}
                value={values.serial}
              />
            </div>

            <div className="mb-3">
              <label>Badge</label>
              <input
                type="text"
                className="form-control"
                name="badge"
                onChange={onchange}
                onBlur={handleBlur}
                value={values.badge}
              />
            </div>
            <div className="mb-3">
              <label>Title One</label>
              <input
                type="text"
                className="form-control"
                name="title_one"
                onChange={onchange}
                onBlur={handleBlur}
                value={values.title_one}
              />
            </div>
            <div className="mb-3">
              <label>Title Two</label>
              <input
                type="text"
                className="form-control"
                name="title_two"
                onChange={onchange}
                onBlur={handleBlur}
                value={values.title_two}
              />
            </div>

            <div className="mb-3">
              <label>Product Link</label>
              <input
                type="text"
                className="form-control"
                name="product_link"
                onChange={onchange}
                onBlur={handleBlur}
                value={""}
              />
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
