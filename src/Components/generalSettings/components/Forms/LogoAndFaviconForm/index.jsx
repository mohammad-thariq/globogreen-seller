import { Button } from "@/common/Button";
import { InputFileUpload } from "@/common/Form/common/inputFileUpload";
import { FilePreviewChange } from "@/utils/filePreviewChange";
import { Formik } from "formik";
import { useState } from "react";

export const LogoAndFaviconsForm = ({ onData, onUpdate, loading }) => {
  const [logoPreview, setLogoPreview] = useState();
  const [favIconPreview, setFavIconPreview] = useState();
  console.log(onData, 'onData-theme');
  return (
    <div>
      <Formik
        initialValues={{
          logo: logoPreview || "",
          favicon: favIconPreview || "",
        }}
        onSubmit={(values, actions) => {
          onUpdate({
            logo: values.logo,
            favicon: values.favicon,
          });

          actions.setSubmitting(true);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form>
            <InputFileUpload
              label="Logo"
              onChange={(e) => FilePreviewChange(e, setLogoPreview)}
              onBlur={handleBlur}
              name="logo"
              value={values?.logo}
              accept="image/*"
              onData={onData?.logo}
              previewImage={logoPreview}
              setPreviewImage={setLogoPreview}
            />
            {/* <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.logo && touched.logo && errors.logo}
            </p> */}
            <InputFileUpload
              label="FavIcon"
              onChange={(e) => FilePreviewChange(e, setFavIconPreview)}
              onBlur={handleBlur}
              name="favicon"
              value={values?.favicon}
              accept="image/*"
              onData={onData?.favicon}
              previewImage={favIconPreview}
              setPreviewImage={setFavIconPreview}
            />
            {/* <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.favicon && touched.favicon && errors.favicon}
            </p> */}
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
