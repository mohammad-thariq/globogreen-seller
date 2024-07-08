import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

export const ProductVarientItemForm = ({
  onSave,
  onClose,
  currentProductVarientItemId,
  currentProductVarientId,
  currentProductId,
  data,
  onUpdate,
  loading,
  varientName,
  button,
}) => {
  const schema = Yup.object({
    name: Yup.string().required("Item Name is Required"),
    price: Yup.string().required("Price is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          varient_name: varientName,
          name: data?.name || "",
          price: data?.price || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentProductVarientItemId,
                name: values?.name,
                price: values?.price,
                product_id: currentProductId,
                variant_id: currentProductVarientId,
                status: values?.status - 1,
              })
            : onSave({
                name: values?.name,
                price: values?.price,
                product_id: currentProductId,
                variant_id: currentProductVarientId,
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
            <label>Variant Name</label>
            <div className="mb-3">
              <input
                type="text"
                name="varient_name"
                className="form-control"
                value={values.varient_name}
                disabled
              />
            </div>
            <label>Item Name</label>
            <div className="mb-3">
              <input
                type="text"
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
            <label>Price (Set 0 to make it free)</label>
            <div className="mb-3">
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.price && touched.price && errors.price}
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