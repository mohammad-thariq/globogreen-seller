import { Button } from "@/common/Button";
import { style } from "../LocationForm/index.module.css";
import { Formik } from "formik";
// import {Form} from "react-bootstrap/Form";
import * as Yup from "yup";
import { InputSelect } from "../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

export const SmsConfigForm = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={
                {
                  // name: data?.name.toLowerCase() || "",
                  // status: data?.status + 1 || "",
                }
              }
              onSubmit={(values, actions) => {
                onUpdate
                  ? onUpdate({
                      //   id: currentCountryId,
                      //   name: values?.name?.toUpperCase(),
                      //   slug: values?.name?.toLowerCase(),
                      //   status: values?.status - 1,
                    })
                  : onSave({
                      //   name: values?.name?.toUpperCase(),
                      //   slug: values?.name?.toLowerCase(),
                      //   status: values?.status - 1,
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
                <form role="form" className="">
                  <h4>Twilio Configuration</h4>
                  <div className="mb-3">
                    <label>Account SID</label>
                    <input
                      type="name"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Auth Token</label>
                    <input
                      type="name"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Twilio Phone Number</label>
                    <input
                      type="name"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Send Regestration OTP
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Password Reset OTP
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Order Confirmation
                    </label>
                  </div>
                  <div className="flex justify-content-fs mb-5">
                    <Button
                      name="Update"
                      bg="#23d24f"
                      type="submit"
                      color="#fff"
                      w="100"
                    />
                  </div>

                  <h4 className="mb-3">Biztech Configuration</h4>

                  <div className="mb-3">
                    <label>API Key</label>
                    <input
                      type="name"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Client Id</label>
                    <input
                      type="name"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Sender Id</label>
                    <input
                      type="name"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Send Regestration OTP
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Password Reset OTP
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Order Confirmation
                    </label>
                  </div>
                  <div className="flex justify-content-fs">
                    <Button
                      name="Update"
                      bg="#23d24f"
                      type="submit"
                      color="#fff"
                      w="100"
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
