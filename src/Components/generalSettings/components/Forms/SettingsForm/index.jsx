import { Button } from "@/common/Button";
import { Formik } from "formik";
import {
  SettingActiveStatus,
  getCountryCode,
} from "@/constant/statusConst";
import { InputSelect } from "@/common/Form/common/inputSelect";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

export const SettingsForm = ({ onData, onUpdate, loading, currencies }) => {
  const [timezones, setTimezones] = useState();
  useEffect(() => {
   const momentTimeZone = moment.tz.names();
   if(momentTimeZone){
   const timeZone = momentTimeZone?.map((i) => ({
      name: i,
      value: i
    }))
    setTimezones(timeZone)
   }
  }, [])


  return (
    <div>
      <Formik
        initialValues={{
          frontend_url: onData?.frontend_url || "",
          phone_number_required: onData?.phone_number_required + 1 || "",
          default_phone_code: onData?.default_phone_code || "",
          contact_email: onData?.contact_email || "",
          multivendor: onData?.enable_multivendor + 1 || "",
          timezone: onData?.timezone || "",
          lg_header: onData?.sidebar_lg_header || "",
          sm_header: onData?.sidebar_sm_header || "",
          currency_name: onData?.currency_name || "",
          currency_icon: onData?.currency_icon ||  "",
        }}
        onSubmit={(values, actions) => {
          onUpdate({
            frontend_url: values.frontend_url,
            phone_number_required: values.phone_number_required - 1,
            default_phone_code: values.default_phone_code,
            user_register: 1,
            contact_email: values.contact_email,
            multivendor: values.multivendor - 1,
            layout: "ltr",
            timezone: values.timezone,
            lg_header: values.lg_header,
            sm_header: values.sm_header,
            currency_name: values.currency_name,
            currency_icon: values.currency_icon,
          });

          actions.setSubmitting(true);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form>
            <div className="mb-3">
              <label>Frontend Root URL</label>
              <input
                type="text"
                name="frontend_url"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.frontend_url}
              />
            </div>
            <InputSelect
              label="Phone number required on the register page"
              name="phone_number_required"
              isValue
              onBlur={handleBlur}
              onChange={handleChange}
              onData={SettingActiveStatus}
              values={values?.phone_number_required}
            />

            <InputSelect
              label="Default Phone Code"
              name="default_phone_code"
              isCode
              onBlur={handleBlur}
              onChange={handleChange}
              onData={getCountryCode}
              values={values?.default_phone_code}
            />

            <InputSelect
              label="Multi Vendor System"
              name="multivendor"
              isValue
              onBlur={handleBlur}
              onChange={handleChange}
              onData={SettingActiveStatus}
              values={values?.multivendor}
            />

            <div className="mb-3">
              <label>Sidebar Large Header</label>
              <input
                type="text"
                name="lg_header"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lg_header}
              />
            </div>
            <div className="mb-3">
              <label>Sidebar Small Header</label>
              <input
                type="text"
                name="sm_header"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sm_header}
              />
            </div>
            <div className="mb-3">
              <label>Contact Email</label>
              <input
                type="email"
                name="contact_email"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_email}
              />
            </div>

            <InputSelect
              label="Default Currency Name"
              name="currency_name"
              isCode
              onBlur={handleBlur}
              onChange={handleChange}
              onData={currencies}
              values={values?.currency_name}
            />

            <div className="mb-3">
              <label>Currency Icon</label>
              <input
                type="text"
                name="currency_icon"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currency_icon}
              />
            </div>

            <InputSelect
              label="Timezone"
              name="timezone"
              isValue
              onBlur={handleBlur}
              onChange={handleChange}
              onData={timezones}
              values={values?.timezone}
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
  );
};
