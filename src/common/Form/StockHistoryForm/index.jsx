import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";

export const StockHistoryForm = ({
  onSave,
  loading,
  button,
}) => {
  const schema = Yup.object({
    product_id: Yup.string().required("Product ID is Required"),
    stock_in: Yup.string().required("Quantity is Required"),
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <Formik
              initialValues={{
                product_id: "",
                stock_in: "",
              }}
              validationSchema={schema}
              onSubmit={(values, actions) => {
               onSave({
                    product_id: values?.product_id,
                    stock_in: values?.stock_in,
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
                <form role="form">
                  <label>Product ID</label>
                  <div className="mb-3">
                    <input
                      type="number"
                      name="product_id"
                      className="form-control"
                      placeholder="Product Id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.product_id}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.product_id && touched.product_id && errors.product_id}
                    </p>
                  </div>
                  <label>Stock In Quantity</label>
                  <div className="mb-3">
                    <input
                      type="number"
                      name="stock_in"
                      className="form-control"
                      placeholder="Stock In"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.stock_in}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.stock_in && touched.stock_in && errors.stock_in}
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
