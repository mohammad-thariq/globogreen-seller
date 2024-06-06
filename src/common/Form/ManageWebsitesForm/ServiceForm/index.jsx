import { Button } from "@/common/Button";
import style from "../../DeliveryManForm/index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { statusConstantOption } from "@/constant/statusConst";
import { InputSelect } from "../../common/inputSelect";

export const ServiceForm = ({
  onSave,
  onClose,
  currentServiceId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const schema = Yup.object({
    title: Yup.string().required("Title is Required"),
    icon: Yup.string().required("Yup is Required"),
    description: Yup.string().required("Description is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          title: data?.title || "",
          icon: data?.icon || "",
          description: data?.description || "",
          status: data?.status +1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentServiceId,
                title: values.title,
                icon: values.icon,
                description: values.description,
                status: values?.status - 1,
              })
            : onSave({
                title: values.title,
                icon: values.icon,
                description: values.description,
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
            <label>Title</label>
            <div className="mb-3">
              <input
                type="name"
                name="title"
                className="form-control"
                placeholder="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.title && touched.title && errors.title}
              </p>
            </div>

            <label>Icon</label>
            <div className="mb-3">
              <input
                type="name"
                name="icon"
                className="form-control"
                placeholder="Icon"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.icon}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.icon && touched.icon && errors.icon}
              </p>
            </div>

            <label>Description</label>
            <div className="mb-3">
              <input
                type="name"
                name="description"
                className="form-control"
                placeholder="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.description &&
                  touched.description &&
                  errors.description}
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
