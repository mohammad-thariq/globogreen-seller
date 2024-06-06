import { Button } from "@/common/Button";
import { Formik } from "formik";
import { InputSelect } from "../common/inputSelect";
import { emailConfigurationEncryptoionOption } from "@/constant/statusConst";

export const EmailConfigForm = ({ onData, onUpdate, loading }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={{
                mail_host: onData.mail_host || "",
                mail_port: onData.mail_port || "",
                email: onData.email || "",
                smtp_username: onData.smtp_username || "",
                smtp_password: onData.smtp_password || "",
                mail_encryption: onData.mail_encryption || "",
              }}
              onSubmit={(values, actions) => {
                onUpdate({
                  mail_host: values.mail_host,
                  mail_port: values.mail_port,
                  email: values.email,
                  smtp_username: values.smtp_username,
                  smtp_password: values.smtp_password,
                  mail_encryption: values.mail_encryption,
                });
                
                actions.setSubmitting(true);
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form>
                  <div className="mb-3">
                    <label>Email Host</label>
                    <input
                      type="text"
                      name="mail_host"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mail_host}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Mail Port</label>
                    <input
                      type="text"
                      name="mail_port"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mail_port}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Email Host</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>

                  <div className="mb-3">
                    <label>SMTP User Name</label>
                    <input
                      type="text"
                      name="smtp_username"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.smtp_username}
                    />
                  </div>
                  <div className="mb-3">
                    <label>SMTP Password</label>
                    <input
                      type="password"
                      name="smtp_password"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.smtp_password}
                    />
                  </div>
                  <InputSelect
                    onData={emailConfigurationEncryptoionOption}
                    label="Mail Encryption"
                    name="mail_encryption"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.mail_encryption}
                    isValue
                  />
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
