import { Button } from "@/common/Button";
import style from "./index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { statusConstantOption } from "@/constant/statusConst";
import { InputSelect } from "../common/inputSelect";


export const WithdrawPaymentForm = ({
  onSave,
  onClose,
  currentWithdrawMethodPayId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const schema = Yup.object({
    name: Yup.string().required("Name is Required"),
    minimum_amount:Yup.string().required("Minimum Amount is Required"),
    maximum_amount:Yup.string().required("Maximum Amount is Required"),
    withdraw_charge:Yup.string().required("Withdraw is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          name: data?.name|| "",
          minimum_amount : data?.min_amount || "",
          maximum_amount: data?.max_amount || "",
          withdraw_charge: data?.withdraw_charge || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentWithdrawMethodPayId,
                name: values?.name,
                minimum_amount: values?.minimum_amount,
                maximum_amount: values?.maximum_amount,
                withdraw_charge: values?.withdraw_charge,
                status: values?.status - 1,
                description: "",
              })
            : onSave({
                name: values?.name,
                minimum_amount: values?.minimum_amount,
                maximum_amount: values?.maximum_amount,
                withdraw_charge: values?.withdraw_charge,
                status: values?.status - 1,
                description: "",
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
            <label>Minimum Amount</label>
            <div className="mb-3">
              <input
                type="name"
                name="minimum_amount"
                className="form-control"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.minimum_amount}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.minimum_amount && touched.minimum_amount && errors.minimum_amount}
              </p>
            </div>
            <label>Maximum Amount</label>
            <div className="mb-3">
              <input
                type="name"
                name="maximum_amount"
                className="form-control"
                placeholder="Maximum Amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maximum_amount}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.maximum_amount && touched.maximum_amount && errors.maximum_amount}
              </p>
            </div>
            <label>Charge</label>
            <div className="mb-3">
              <input
                type="name"
                name="withdraw_charge"
                className="form-control"
                placeholder="Withdraw Charge"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.withdraw_charge}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.withdraw_charge && touched.withdraw_charge && errors.withdraw_charge}
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
