import { Button } from "@/common/Button";
import style from "../DeliveryManForm/index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
// import { statusConstantOption} from "@/constant/statusConst";
// import { InputSelect } from "../../common/inputSelect";

export const WithdrawForm = ({ loading ,button, onClose, onUpdate, onSave, onwithdraw }) => {
  console.log(onwithdraw, "......");
  const schema = Yup.object({
    method_id: Yup.string().required("Method ID is Required"),
    withdraw_amount: Yup.string().required("Withdraw Amount ID is Required"),
    account_info: Yup.string().required("Account Info is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          method_id: "",
          withdraw_amount: "",
          account_info: "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({})
            : onSave({
                method_id: values?.method_id,
                withdraw_amount: values?.withdraw_amount,
                account_info: values?.account_info,
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
          <form className="w-350">
            <label>Withdraw Method</label>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                name="method_id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.method_id}
              >
                <option>select</option>

                {onwithdraw?.methods?.map((item, idx) => (
                  <option key={idx}>{item.name}</option>
                ))}
              </select>
              <p
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  color: "red",
                }}
              >
                {errors.method_id && touched.method_id && errors.method_id}
              </p>
            </div>

            <label>Withdraw Amount</label>
            <div className="mb-3">
              <input
                type="text"
                name="withdraw_amount"
                className="form-control"
                placeholder="Withdraw amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.withdraw_amount}
              />
              <p
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  color: "red",
                }}
              >
                {errors.withdraw_amount &&
                  touched.withdraw_amount &&
                  errors.withdraw_amount}
              </p>
            </div>
            <label>Account Information</label>
            <div className="mb-3">
              <textarea
                type="text"
                name="account_info"
                className="form-control"
                placeholder="Account Information"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.account_info}
              />
              <p
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  color: "red",
                }}
              >
                {errors.account_info &&
                  touched.account_info &&
                  errors.account_info}
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
