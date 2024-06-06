import { Button } from "@/common/Button";
import style from "./index.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputSelect } from "../../common/inputSelect";

export const CategoryAddForm = ({
  onClose,
  categories,
  title
}) => {
  const schema = Yup.object({
    category: Yup.string().required("category is Required"),
  });

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          category: "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onSave({
            category: values?.category,
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
          <form >
            <h3>{title}</h3>
            <InputSelect 
            label="Category"
            name="category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.category}
              onData={categories}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.category && touched.category && errors.category}
            </p>
            <div className={style.btnWrapper}>
              <Button
                name="Close"
                border="1px solid #23D24F"
                color="#000"
                onClick={onClose}
              />
              <Button name="Save" bg="#23d24f" type="submit" color="#fff" onClick={handleSubmit}/>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
