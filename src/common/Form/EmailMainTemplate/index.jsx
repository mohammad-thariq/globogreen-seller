import { Button } from "@/common/Button";
import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { BaseUrls } from "../../../../env";
import {
  tinyMceContentStyle,
  tinyMcePlugin,
  tinyMceToolbar,
} from "@/constant/tableHeading";
import { useRef } from "react";

export const EmailMailTemplateForm = ({ onData, onUpdate, loading }) => {
  const editorRef = useRef("");
  const getLongDescription =
    editorRef.current && editorRef.current.getContent();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={{
                subject: onData?.subject || "",
                description: onData?.description || getLongDescription || "",
              }}
              onSubmit={(values, actions) => {
                onUpdate({
                  id: onData.id,
                  subject: values.subject,
                  description: onData?.description || getLongDescription,
                });

                actions.setSubmitting(true);
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form>
                  <div className="mb-3">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject}
                    />
                  </div>

                  <label>Description</label>
                  <div className="mb-2">
                    <Editor
                      apiKey={BaseUrls.TINYMCE_API_KEY}
                      onInit={(_evt, editor) => (editorRef.current = editor)}
                      initialValue={values?.description}
                      // tagName="long_description"
                      init={{
                        height: 300,
                        menubar: false,
                        plugins: tinyMcePlugin,
                        toolbar: tinyMceToolbar,
                        content_style: tinyMceContentStyle,
                      }}
                    />
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
