import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { OfferTypeOptions, statusConstantOption } from "@/constant/statusConst";
import { InputSelect } from "../../common/inputSelect";

export const CouponForm = ({
  onSave,
  onClose,
  currentCouponId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const schema = Yup.object({
    name: Yup.string().required("Name is Required"),
    code: Yup.string().required("Code is Required"),
    number_of_time: Yup.string().required("Number Of Time is Required"),
    offer_type: Yup.string().required("Offer Type is Required"),
    discount: Yup.string().required("Discount is Required"),
    expired_date: Yup.string().required("Expired Date is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          name: data?.name || "",
          code: data?.code || "",
          number_of_time: data?.max_quantity || 0,
          offer_type: data?.offer_type || "", // 1 is %, 2 is Rs
          discount: data?.discount || "",
          expired_date: data?.expired_date || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentCouponId,
                name: values?.name,
                code: values?.code,
                number_of_time: values?.number_of_time,
                offer_type: values?.offer_type, // 1 is %, 2 is Rs
                discount: values?.discount,
                expired_date: values?.expired_date,
                status: values?.status - 1,
              })
            : onSave({
                name: values?.name,
                code: values?.code,
                number_of_time: values?.number_of_time,
                offer_type: values?.offer_type, // 1 is %, 2 is Rs
                discount: values?.discount,
                expired_date: values?.expired_date,
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
          <form className="formInner overflow-column height-500 w-350">
            <label>Name</label>
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
            <label>Code</label>
            <div className="mb-3">
              <input
                type="text"
                name="code"
                className="form-control"
                placeholder="Code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.code && touched.code && errors.code}
              </p>
            </div>
            <label>Number Of Times</label>
            <div className="mb-3">
              <input
                type="number"
                name="number_of_time"
                className="form-control"
                placeholder="Number Of Times"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.number_of_time}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.number_of_time && touched.number_of_time && errors.number_of_time}
              </p>
            </div>
            <label>Expired Date</label>
            <div className="mb-3">
              <input
                type="date"
                name="expired_date"
                className="form-control"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.expired_date}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.expired_date && touched.expired_date && errors.expired_date}
              </p>
            </div>
            <InputSelect
              label={"Offer Type"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"offer_type"}
              values={values?.offer_type}
              isValue
              onData={OfferTypeOptions}
            />

            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.status && touched.status && errors.status}
            </p>
            <label>Discount</label>
            <div className="mb-3">
              <input
                type="text"
                name="discount"
                className="form-control"
                placeholder="Discount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.discount}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.discount && touched.discount && errors.discount}
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
