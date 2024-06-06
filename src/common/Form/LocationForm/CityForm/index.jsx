import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { statusConstantOption} from "@/constant/statusConst";
import { InputSelect } from "../../common/inputSelect";

export const CityForm = ({
  onSave,
  onClose,
  currentCityId,
  getCountry,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const schema = Yup.object({
    country: Yup.number().required("Country is Reuired"),
    state: Yup.number().required("State is Reuired"),
    name: Yup.string().required("Name is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          country: data?.country_state?.country_id || "",
          state: data?.country_state_id || "",
          name: data?.name || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentCityId,
                country: values?.country,
                state: values?.state,
                name: values?.name?.toUpperCase(),
                slug: values?.name?.toLowerCase(),
                status: values?.status - 1,
              })
            : onSave({
                country: values?.country,
                state: values?.state,
                name: values?.name?.toUpperCase(),
                slug: values?.name?.toLowerCase(),
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
          <form role="form" className="w-350">
            <label>Country</label>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              >
                <option hidden>Select country</option>
                {getCountry?.countries?.map((i) => (
                  <option key={i?.id} value={i?.id}>
                    {i?.name.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.country && touched.country && errors.country}
            </p>
            <label>State</label>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
              >
                <option hidden>Select state</option>
                {getCountry?.countries?.map((i) =>
                  i?.country_states?.map((j) => (
                    <option key={j?.id} value={j?.id}>
                      {j?.name.toLowerCase()}
                    </option>
                  ))
                )}
              </select>
            </div>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.state && touched.state && errors.state}
            </p>
            <label>City Name / Delivery Area</label>
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
