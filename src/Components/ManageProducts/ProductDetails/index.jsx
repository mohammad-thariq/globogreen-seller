import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { ProductDetailGalleryForm } from "@/common/Form/ProductCategoriesForm/ProductDetailGalleryForm";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { productDetailsTableHeading } from "@/constant/tableHeading";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const ProductDetailGallery = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const [currentProductGalleryImageId, setcurrentProductGalleryImageId] =
    useState();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const { productsById, createProductGalleryById, deleteProductGalleryById, updateProductGalleryStatus } =
    new productCateoriesAPI();

  const { data, refetch } = useQuery(["product-gallery", id], productsById, {
    enabled: !!id,
  });

  const {
    mutate: updateProductGalleryStatusMutate,
    isLoading: updateProductGalleryStatusLoading,
  } = useMutation(updateProductGalleryStatus, {
    onSuccess: (data, variables, context) => {
      ToastifySuccess(data);
      refetch();
    },
    onError: (data, variables, context) => {
      ToastifyFailed(data ? data : "Internal Server Error");
    },
  });


  const {
    mutate: deleteProductGalleryByIdByIdMutate,
    isLoading: deleteProductGalleryByIdByIdLoading,
  } = useMutation(deleteProductGalleryById, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data ? data?.message : "Internal Server Error");
    },
  });

  const {
    mutate: createProductGalleryByIdMutate,
    isLoading: createProductGalleryByIdLoading,
  } = useMutation(createProductGalleryById, {
    onSuccess: (data, variables, context) => {
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      ToastifyFailed(data?.message);
    },
  });

  const handleOpenUpdatePopup = (id) => {
    updateProductGalleryStatusMutate({ id: id });
  };

  const handleOpenDeletePopup = (id) => {
    setcurrentProductGalleryImageId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleDeleteProductGalleryImage = () => {
    deleteProductGalleryByIdByIdMutate({ id: currentProductGalleryImageId });
  };
  
  const handleNavigateBack = () => {
    router.back()
  };

  return (
    <>
      <PageHeader title="Product Gallery" />
      <Breadcrumb currentPage={`Product : ${data?.product?.short_name}`} />
      <div className="flex ms-4 mb-4">
        <Button
          name="Go Back"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleNavigateBack}
        />
      </div>
      <ProductDetailGalleryForm
        onLoading={createProductGalleryByIdLoading}
        onSave={createProductGalleryByIdMutate}
        currentProductId={data?.product?.id}
      />
      <BaseTable
        tableHeadings={productDetailsTableHeading}
        onProductDetailsData={data}
        onDelete={handleOpenDeletePopup}
        onUpdate={handleOpenUpdatePopup}
        length={data?.gallery?.length === 0}
      />

      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleOpenDeletePopup}>
          <DeleteItem
            onClose={handleOpenDeletePopup}
            onClick={handleDeleteProductGalleryImage}
            loading={deleteProductGalleryByIdByIdLoading}
          />
        </Popup>
      )}
    </>
  );
};