import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";

export const ChangePasswordForm = ({ loading, onUpdate }) => {
  const schema = Yup.object({
    password: Yup.string().required("New Password is Reuired"),
    password_confirmation: Yup.string().required(
      "Password Confirmation is Reuired"
    ),
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={{
                password: "",
                password_confirmation: "",
              }}
              validationSchema={schema}
              onSubmit={(values, actions) => {
                onUpdate({
                  password_confirmation: values?.password_confirmation,
                  password: values?.password,
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
                  <div className="mb-3">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="password_confirmation"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.password_confirmation &&
                        touched.password_confirmation &&
                        errors.password_confirmation}
                    </p>
                  </div>

                  <div className="flex justify-content-fs">
                    <Button
                      name="Update"
                      bg="#23d24f"
                      type="submit"
                      color="#fff"
                      w="100"
                      onClick={handleSubmit}
                      isSubmitting={loading}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
