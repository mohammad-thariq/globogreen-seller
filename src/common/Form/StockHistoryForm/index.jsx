import { Button } from "@/common/Button";

import { Formik } from "formik";
import { useState } from "react";

export const StockHistoryForm = ({
  onSave,
  onClose,
  currentBrandsId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={{}}
              // validationSchema={schema}
              onSubmit={(values, actions) => {
                onUpdate
                  ? onUpdate({
                      id: currentBrandsId,
                    })
                  : onSave({});
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
                <form role="form">
                  <label>Product</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="product"
                      className="form-control"
                      placeholder="Product"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.product}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>
                  <label>Stock In Quantity</label>
                  <div className="mb-3">
                    <input
                      type="name"
                      name="slug"
                      className="form-control"
                      placeholder="Slug"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.slug}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.slug && touched.slug && errors.slug}
                    </p>
                  </div>

                  <Button
                    name={button}
                    bg="#23d24f"
                    type="submit"
                    color="#fff"
                    onClick={handleSubmit}
                    isSubmitting={loading}
                  />
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
