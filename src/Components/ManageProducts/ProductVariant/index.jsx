import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { ProductVariantForm } from "@/common/Form/ProductCategoriesForm/ProductVariantForm";
import { Loader } from "@/common/Loader";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { productVariantTableHeading } from "@/constant/tableHeading";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const ProductVariant = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const {
    productVariantById,
    createProductVariant,
    updateProductVariant,
    deleteProductVariantById,
  } = new productCateoriesAPI();

  const { data, isLoading, refetch } = useQuery(
    ["products", id],
    productVariantById
  );
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentProductVariantId, setCurrentProductVariantId] = useState(null);
  const [currentProductVariantDataId, setCurrentProductVariantDataId] =
    useState(null);

  const {
    mutate: createProductVariantMutate,
    isLoading: createProductVariantLoading,
  } = useMutation(createProductVariant, {
    onSuccess: (data, variables, context) => {
      setOpenCreatePopup(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenCreatePopup(true);
      refetch();
      ToastifyFailed(data?.message);
    },
  });

  const {
    mutate: updateProductVariantMutate,
    isLoading: updateProductVariantLoading,
  } = useMutation(updateProductVariant, {
    onSuccess: (data, variables, context) => {
      setOpenUpdatePopup(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenUpdatePopup(true);
      ToastifyFailed(data?.message);
      refetch();
    },
  });

  const {
    mutate: deleteProductVariantMutate,
    isLoading: deleteProductVariantLoading,
  } = useMutation(deleteProductVariantById, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.message);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.message);
    },
  });

  const handleCreateProductVariant = () => {
    setOpenCreatePopup(!openCreatePopup);
  };
  const handleUpdateProductVariant = (id) => {
    setOpenUpdatePopup(!openUpdatePopup);
    setCurrentProductVariantId(id);
    const getProductById = data?.variants?.find((i) => i?.id === id);
    setCurrentProductVariantDataId(getProductById);
  };

  const handleDeleteProductVariant = (id) => {
    setCurrentProductVariantId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleNavigateProductVariantItem = (id, productId) => {
    router.push({
      pathname: `/seller/products/product-variant-item/${id}`,
      query: { product_id: productId },
    });
  };

  const handleNavigateGoBack = () => {
    router.back();
  };

  const deleteProductVariant = () => {
    deleteProductVariantMutate({ id: currentProductVariantId });
  };

  if (isLoading) {
    return <Loader />;
  }

  console.log(data, "data");
  return (
    <>
      <PageHeader title="Product Variant" />
      <Breadcrumb
        currentPage={`Product : ${data?.product?.short_name}`}
        serachEnable
      />
      <div className="flex ms-4 gap-2">
        <Button
          name="Go Back"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleNavigateGoBack}
        />
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateProductVariant}
        />
      </div>
      <BaseTable
        tableHeadings={productVariantTableHeading}
        tableTitle={`Product : ${data?.product?.name}`}
        onProductVariantData={data}
        onUpdate={handleUpdateProductVariant}
        onDelete={handleDeleteProductVariant}
        onNavigate={handleNavigateProductVariantItem}
        length={data?.variants?.length === 0}
      />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateProductVariant}>
          <ProductVariantForm
            onClose={handleCreateProductVariant}
            onSave={createProductVariantMutate}
            button="Add New"
            currentProductId={id}
            loading={createProductVariantLoading}
          />
        </Popup>
      )}
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateProductVariant}>
          <ProductVariantForm
            onClose={handleUpdateProductVariant}
            data={currentProductVariantDataId}
            currentProductVarientsId={currentProductVariantId}
            button="update"
            onUpdate={updateProductVariantMutate}
            currentProductId={id}
            loading={updateProductVariantLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteProductVariant}>
          <DeleteItem
            onClose={handleDeleteProductVariant}
            onClick={deleteProductVariant}
            loading={deleteProductVariantLoading}
          />
        </Popup>
      )}
    </>
  );
};