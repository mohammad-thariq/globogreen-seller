import Image from "next/image";
import { BaseUrls } from "../../../../../env";
import { Button } from "@/common/Button";
import { Formik } from "formik";
import { useState } from "react";

export const ImageContantForm = ({ data, onUpdate, loading }) => {
  const [imageFile, setImageFile] = useState(null);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card p-5 mb-4 justify-content-fs">
              <Formik
                initialValues={{}}
                onSubmit={(values, actions) => {
                  onUpdate({
                    image: imageFile || data?.image,
                    empty_cart:
                      "uploads/website-images/empty_cart-2022-11-17-11-10-20-7795.png",
                    empty_wishlist:
                      "uploads/website-images/empty_wishlist-2022-11-17-11-23-16-9350.png",
                    change_password_image:
                      "uploads/website-images/change_password_image-2022-11-17-11-26-36-3416.png",
                    become_seller_avatar:
                      "uploads/website-images/become_seller_avatar-2022-11-17-11-38-55-7934.png",
                    become_seller_banner:
                      "uploads/website-images/become_seller_banner-2022-11-17-11-41-53-5886.png",
                    login_image:
                      "uploads/website-images/login_image-2022-11-17-11-07-21-2774.png",
                    error_page:
                      "uploads/website-images/error_page-2022-11-17-11-27-36-6180.png",
                  });

                  actions.setSubmitting(true);
                }}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <form>
                    <label>Empty Cart Page</label>
                    <div>
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={
                          `${BaseUrls?.IMAGE_URL}/${data?.empty_cart}` ||
                          "/assets/img/placeholder.jpg"
                        }
                        className="text-secondary text-sm font-weight-bold product-image mb-3"
                      />
                    </div>
                    <div className="mb-3">
                      <label>New Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="empty_cart"
                        onChange={(e) => {
                          const file = e?.currentTarget?.files[0];
                          setImageFile(file?.name);
                        }}
                        onBlur={handleBlur}
                        value={values.empty_cart}
                      />
                    </div>

                    <label>Empty Whishlist Page</label>
                    <div>
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={
                          `${BaseUrls?.IMAGE_URL}/${data?.empty_wishlist}` ||
                          "/assets/img/placeholder.jpg"
                        }
                        className="text-secondary text-sm font-weight-bold product-image mb-3"
                      />
                    </div>
                    <div className="mb-3">
                      <label>New Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="empty_wishlist"
                        onChange={(e) => {
                          const file = e?.currentTarget?.files[0];
                          setImageFile(file?.name);
                        }}
                        onBlur={handleBlur}
                        value={values.empty_wishlist}
                      />
                    </div>

                    <label>Change Password Image</label>
                    <div>
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={
                          `${BaseUrls?.IMAGE_URL}/${data?.change_password_image}` ||
                          "/assets/img/placeholder.jpg"
                        }
                        className="text-secondary text-sm font-weight-bold product-image mb-3"
                      />
                    </div>
                    <div className="mb-3">
                      <label>New Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="change_password_image"
                        onChange={(e) => {
                          const file = e?.currentTarget?.files[0];
                          setImageFile(file?.name);
                        }}
                        onBlur={handleBlur}
                        value={values.change_password_image}
                      />
                    </div>

                    <label>Become Seller Avatar</label>
                    <div>
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={
                          `${BaseUrls?.IMAGE_URL}/${data?.become_seller_avatar}` ||
                          "/assets/img/placeholder.jpg"
                        }
                        className="text-secondary text-sm font-weight-bold product-image mb-3"
                      />
                    </div>
                    <div className="mb-3">
                      <label>New Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="become_seller_avatar"
                        onChange={(e) => {
                          const file = e?.currentTarget?.files[0];
                          setImageFile(file?.name);
                        }}
                        onBlur={handleBlur}
                        value={values.become_seller_avatar}
                      />
                    </div>

                    <label>Become Seller Banner</label>
                    <div>
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={
                          `${BaseUrls?.IMAGE_URL}/${data?.become_seller_banner}` ||
                          "/assets/img/placeholder.jpg"
                        }
                        className="text-secondary text-sm font-weight-bold product-image mb-3"
                      />
                    </div>
                    <div className="mb-3">
                      <label>New Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="become_seller_banner"
                        onChange={(e) => {
                          const file = e?.currentTarget?.files[0];
                          setImageFile(file?.name);
                        }}
                        onBlur={handleBlur}
                        value={values.become_seller_banner}
                      />
                    </div>

                    <label>Login</label>
                    <div>
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={
                          `${BaseUrls?.IMAGE_URL}/${data?.login_image}` ||
                          "/assets/img/placeholder.jpg"
                        }
                        className="text-secondary text-sm font-weight-bold product-image mb-3"
                      />
                    </div>
                    <div className="mb-3">
                      <label>New Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="login_image"
                        onChange={(e) => {
                          const file = e?.currentTarget?.files[0];
                          setImageFile(file?.name);
                        }}
                        onBlur={handleBlur}
                        value={values.login_image}
                      />
                    </div>

                    <label>Empty Cart Page</label>
                    <div>
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={
                          `${BaseUrls?.IMAGE_URL}/${data?.error_page}` ||
                          "/assets/img/placeholder.jpg"
                        }
                        className="text-secondary text-sm font-weight-bold product-image mb-3"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Error Page</label>
                      <input
                        type="file"
                        className="form-control"
                        name="error_page"
                        onChange={(e) => {
                          const file = e?.currentTarget?.files[0];
                          setImageFile(file?.name);
                        }}
                        onBlur={handleBlur}
                        value={values.error_page}
                      />
                    </div>

                    <Button
                      name="Update"
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
    </>
  );
};
