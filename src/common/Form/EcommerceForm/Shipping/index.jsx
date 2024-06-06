import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { InputSelect } from "../../common/inputSelect";
import { ShippingRuleType } from "@/constant/statusConst";

export const ShippingRuleForm = ({
  onSave,
  onClose,
  currentShippingRuleId,
  data,
  onUpdate,
  loading,
  locationData,
  button,
}) => {
  const schema = Yup.object({
    city_id: Yup.string().required("City is Required"),
    shipping_rule: Yup.string().required("Shipping Rule is Required"),
    type: Yup.string().required("Type is Required"),
    shipping_fee: Yup.string().required("Shipping Fee Type is Required"),
    condition_from: Yup.string().required("Condition From is Required"),
    condition_to: Yup.string().required("Condition To Date is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          city_id: data?.city_id === 0 ? data?.city_id + 1 : data?.city_id ||  "",
          shipping_rule:  data?.shipping_rule  || "",
          type:  data?.type  || "",
          shipping_fee:  data?.shipping_fee ||  "", // 1 is %, 2 is Rs
          condition_from:  data?.condition_from  || "",
          condition_to:  data?.condition_to  || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentShippingRuleId,
                city_id: values?.city_id === "1" ? values?.city_id - 1 : values?.city_id,
                shipping_rule: values?.shipping_rule,
                type: values?.type,
                shipping_fee:values?.shipping_fee, // 1 is %, 2 is Rs
                condition_from:values?.condition_from,
                condition_to:values?.condition_to,
              })
            : onSave({
              city_id: values?.city_id === "1" ? values?.city_id - 1 : values?.city_id,
              shipping_rule: values?.shipping_rule,
              type: values?.type,
              shipping_fee:values?.shipping_fee, // 1 is %, 2 is Rs
              condition_from:values?.condition_from,
              condition_to:values?.condition_to,
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
          <form className="formInner overflow-column height-500 w-350">
            <InputSelect
              name="city_id"
              label="City / Delivery Area"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values?.city_id}
              isValue
              onData={locationData}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.city_id && touched.city_id && errors.city_id}
            </p>
            <label>Shipping Rule</label>
            <div className="mb-3">
              <input
                type="text"
                name="shipping_rule"
                className="form-control"
                placeholder="Shipping Rule"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.shipping_rule}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.shipping_rule &&
                  touched.shipping_rule &&
                  errors.shipping_rule}
              </p>
            </div>
            <InputSelect
              name="type"
              label="Type"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values?.type}
              isValue
              onData={ShippingRuleType}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.type && touched.type && errors.type}
            </p>
            <label>Condition From</label>
            <div className="mb-3">
              <input
                type="number"
                name="condition_from"
                className="form-control"
                placeholder="Condition From"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.condition_from}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.condition_from &&
                  touched.condition_from &&
                  errors.condition_from}
              </p>
            </div>
            <label>Condition To</label>
            <div className="mb-3">
              <input
                type="number"
                name="condition_to"
                className="form-control"
                placeholder="Condition To"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.condition_to}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.condition_to &&
                  touched.condition_to &&
                  errors.condition_to}
              </p>
            </div>
            <label>Shipping Fee</label>
            <div className="mb-3">
              <input
                type="number"
                name="shipping_fee"
                className="form-control"
                placeholder="Shipping Fee"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.shipping_fee}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.shipping_fee &&
                  touched.shipping_fee &&
                  errors.shipping_fee}
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
