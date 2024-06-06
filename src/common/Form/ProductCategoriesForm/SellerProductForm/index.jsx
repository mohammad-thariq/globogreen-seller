import { Formik } from "formik";
import style from "../index.module.css";
import { Button } from "@/common/Button";

export const SellerProductForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
}) => {
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          id: data?.id || "",
          name: data?.name || "",
          price: data?.price || "",
          photo: data?.thumb_image || "",
          type: data?.type || "",
          status: data?.status || "",
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
            <label>Name</label>
            <div className="mb-2">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="Icon-addon"
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
            <label>Price</label>
            <div className="mb-2">
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.price && touched.price && errors.price}
              </p>
            </div>
            <label>Photo</label>
            <div className="mb-2">
              <input
                type="number"
                name="photo"
                className="form-control"
                placeholder="Photo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.photo}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.photo && touched.photo && errors.photo}
              </p>
            </div>
            <label>Type</label>
            <div className="mb-2">
              <input
                type="name"
                name="type"
                className="form-control"
                placeholder="Type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.type && touched.type && errors.type}
              </p>
            </div>

            <label>Status</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
            >
              <option hidden>Select Status</option>
              <option value={0}>Inactive</option>
              <option value={1}>Active</option>
            </select>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.status && touched.status && errors.status}
            </p>
            <div className={style.btnWrapper}>
              <Button
                name="Close"
                border="1px solid #23D24F"
                color="#000"
                onClick={onClose}
              />
              <Button
                name={button}
                bg="#23d24f"
                type="submit"
                color="#fff"
                onClick={handleSubmit}
                // isSubmitting={loading}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
