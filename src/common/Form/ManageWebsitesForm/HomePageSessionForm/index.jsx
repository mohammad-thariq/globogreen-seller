import { Button } from "@/common/Button";
import {style} from "../.././LocationForm/index.module.css"
import * as Yup from "yup";
import { Formik } from "formik";

export const HomePageSessionForm = ({
  onClose,
  currentKey,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const schema = Yup.object({
    custom: Yup.string().required("Custom is Required"),
  });

  console.log(data , "dddd")
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          custom: data?.custom || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                key: currentKey,
                custom: values?.custom,
              })
            : "";
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
            <label>Changeable</label>
            <div className="mb-3">
              <input
                type="text"
                name="custom"
                className="form-control"
                placeholder="None"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.custom}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.custom && touched.custom && errors.custom}
              </p>
            </div>

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
