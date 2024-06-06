import { Button } from "@/common/Button";
import style from "../DeliveryManForm/index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
// import { statusConstantOption} from "@/constant/statusConst";
// import { InputSelect } from "../../common/inputSelect";

export const WithdrawForm = ({
button,
onClose,
}) => {
  const schema = Yup.object({
  
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
               
              })
            : onSave({
               
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
            <label>Withdraw Method</label>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              >
                <option hidden>Select</option>
               
              </select>
            </div>

            <label>Withdraw Amount</label>
            <div className="mb-3">
              <input
                type="text"
                name="Withdraw Amount"
                className="form-control"
                placeholder="Withdraw amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
             
            </div>
            <label>Account Information</label>
            <textarea
             type="text"
             name="Account Information"
             className="form-control"
             placeholder="Account Information"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
            />
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
                isSubmitting={""}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
