import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

export const ProductVariantForm = ({
  onSave,
  onClose,
  currentProductVarientsId,
  currentProductId,
  data,
  onUpdate,
  loading,
  button,
}) => {

  const schema = Yup.object({
    name: Yup.string().required("Name is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          name: data?.name || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentProductVarientsId,
                product_id: currentProductId,
                name: values?.name,
                status: values?.status -1,
              })
            : onSave({
                product_id: currentProductId,
                name: values?.name,
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
          <form role="form">
            <label>Name</label>
            <div className="mb-3">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Name"
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
              label="Status"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values?.status}
              name="status"
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