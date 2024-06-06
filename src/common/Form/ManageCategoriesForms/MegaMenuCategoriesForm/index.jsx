import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import style from "../index.module.css";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

export const MegaMenuCategoriesForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
  getCategory,
  currentMegaMenuCategoryId,
  loading,
}) => {
  const schema = Yup.object({
    category: Yup.string().required("Category is Required"),
    serial: Yup.string().required("Serial is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          category: data?.category_id || "",
          serial: data?.serial || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentMegaMenuCategoryId,
                category: values?.category,
                serial: values?.serial,
                status: values?.status - 1,
              })
            : onSave({
                category: values?.category,
                serial: values?.serial,
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
          <form>
            <InputSelect
              label="Category"
              values={values?.category}
              name="category"
              onBlur={handleBlur}
              onChange={handleChange}
              onData={getCategory || getCategory?.categories}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.category && touched.category && errors.category}
            </p>

            <label>Serial</label>
            <div className="mb-2">
              <input
                type="text"
                name="serial"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.serial}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.serial && touched.serial && errors.serial}
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
                onClick={onClose}
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
