import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { InputFileUpload } from "@/common/Form/common/inputFileUpload";
import { InputSelect } from "@/common/Form/common/inputSelect";
import ProfileCard from "@/common/ProfileCard";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { statusConstantOption } from "@/constant/statusConst";
import { EcommerceAPI } from "@/service/ecommerce/EcommerceAPI";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import * as Yup from "yup";
import { useMutation, useQuery } from "react-query";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";

export const FlashSale = () => {
  const [flashSaleData, setFlashSaleData] = useState(null);
  const [homepageImage, setHomepageImage] = useState(null);
  const [flashsalepageImage, setFlashsalepageImage] = useState(null);

  const { flashSale, updateFlashSale } = new EcommerceAPI();
  const { data, isLoading, refetch } = useQuery(["flash-sale"], flashSale);

  const schema = Yup.object({
    title: Yup.string().required("Title is Required"),
    end_time: Yup.string().required("End Time is Required"),
    offer: Yup.string().required("Offer is Required"),
    // flashsale_page_image: Yup.string().required("Flash Sale Image is Required"),
    // homepage_image: Yup.string().required("Home Page is Required"),
    status: Yup.string().required("Status is Required"),
  });

  useEffect(() => {
    if (data) {
      setFlashSaleData(data?.flash_sale);
    }
  }, [data]);

  const { mutate: onUpdate, isLoading: updateLoading } = useMutation(
    updateFlashSale,
    {
      onSuccess: (data, variables, context) => {
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        ToastifyFailed(data?.message);
        refetch();
      },
    }
  );

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb currentPage={"Flash Sale"} serachEnable />
      <ProfileCard>
        {flashSaleData && (
          <div className="card-body">
            <Formik
              initialValues={{
                title: flashSaleData?.title || "",
                end_time: flashSaleData?.end_time || "",
                offer: flashSaleData?.offer || "",
                status: flashSaleData?.status + 1 || "",
                homepage_image: homepageImage,
                flashsale_page_image: flashsalepageImage,
              }}
              validationSchema={schema}
              onSubmit={(values, actions) => {
                onUpdate({
                  title: values.title,
                  end_time: values.end_time,
                  offer: values.offer,
                  status: values.status - 1,
                  homepage_image: homepageImage,
                  flashsale_page_image: flashsalepageImage,
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
                isSubmitting,
              }) => (
                <form>
                  <div className="mb-3 flex justify-content-se align-items-center gap-4">
                    <div>
                      <InputFileUpload
                        label="Homepage Image"
                        name="homepage_image"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onData={data?.flash_sale?.homepage_image}
                        previewImage={homepageImage}
                        setPreviewImage={setHomepageImage}
                      />
                      {/* <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.homepage_image && touched.homepage_image && errors.homepage_image}
              </p> */}
                    </div>
                    <div>
                      <InputFileUpload
                        label="Flash Sale Page Image"
                        name="flashsale_page_image"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onData={data?.flash_sale?.flashsale_page_image}
                        previewImage={flashsalepageImage}
                        setPreviewImage={setFlashsalepageImage}
                      />
                      {/* <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.flashsale_page_image && touched.flashsale_page_image && errors.flashsale_page_image}
              </p> */}
                    </div>
                  </div>

                  <label>Title</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      placeholder="Title"
                      className="form-control"
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.title && touched.title && errors.title}
                    </p>
                  </div>
                  <label>Offer</label>
                  <div className="mb-3">
                    <input
                      type="number"
                      name="offer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.offer}
                      max="100"
                      min="0"
                      className="form-control"
                      placeholder="Offer in percentage"
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.offer && touched.offer && errors.offer}
                    </p>
                  </div>
                  <label>End Time</label>
                  <div className="mb-3">
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="end_time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.end_time}
                    />
                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        color: "red",
                      }}
                    >
                      {errors.end_time && touched.end_time && errors.end_time}
                    </p>
                  </div>
                  <InputSelect
                    label="Status"
                    name="status"
                    values={values?.status}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onData={statusConstantOption}
                    isValue
                  />
                  <p
                    style={{
                      marginTop: "5px",
                      marginBottom: "5px",
                      color: "red",
                    }}
                  >
                    {errors.status && touched.status && errors.status}
                  </p>
                  <Button
                    name="Update Flash Sale"
                    type="submit"
                    bg="#23d24f"
                    color="#fff"
                    onClick={handleSubmit}
                    isSubmitting={updateLoading}
                  />
                </form>
              )}
            </Formik>
          </div>
        )}
      </ProfileCard>
    </>
  );
};
