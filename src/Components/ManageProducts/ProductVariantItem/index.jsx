import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { ProductVarientItemForm } from "@/common/Form/ProductCategoriesForm/ProductVariantItemForm";
import { Loader } from "@/common/Loader";
import { PageHeader } from "@/common/PageHeader";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { productVariantItemTableHeading } from "@/constant/tableHeading";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const ProductVariantItem = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const productId = router?.query?.product_id;
  console.log(router, "router");
  const {
    productVariantItemById,
    createProductVariantItem,
    updateProductVariantItem,
    deleteProductVariantItemById,
  } = new productCateoriesAPI();

  const { data, isLoading, refetch } = useQuery(
    ["products", id, productId],
    productVariantItemById
  );
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentProductVariantItemId, setCurrentProductVariantItemId] =
    useState(null);
  const [currentProductVariantItemDataId, setCurrentProductVariantItemDataId] =
    useState(null);

  const {
    mutate: createProductVariantItemMutate,
    isLoading: createProductVariantItemLoading,
  } = useMutation(createProductVariantItem, {
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
    mutate: updateProductVariantItemMutate,
    isLoading: updateProductVariantItemLoading,
  } = useMutation(updateProductVariantItem, {
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
    mutate: deleteProductVariantItemMutate,
    isLoading: deleteProductVariantItemLoading,
  } = useMutation(deleteProductVariantItemById, {
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

  const handleCreateProductVariantItem = () => {
    setOpenCreatePopup(!openCreatePopup);
  };
  const handleUpdateProductVariantItem = (id) => {
    setOpenUpdatePopup(!openUpdatePopup);
    setCurrentProductVariantItemId(id);
    const getProductById = data?.variantItems?.find((i) => i?.id === id);
    setCurrentProductVariantItemDataId(getProductById);
  };

  const handleDeleteProductVariantItem = (id) => {
    setCurrentProductVariantItemId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleNavigateGoBack = () => {
    router.back();
  };

  const deleteProductVariantItem = () => {
    deleteProductVariantItemMutate({ id: currentProductVariantItemId });
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
          onClick={handleCreateProductVariantItem}
        />
      </div>
      <BaseTable
        tableHeadings={productVariantItemTableHeading}
        tableTitle={`Product : ${data?.product?.name}`}
        onProductVariantItemData={data}
        onUpdate={handleUpdateProductVariantItem}
        onDelete={handleDeleteProductVariantItem}
        length={data?.variantItems?.length === 0}
      />
      {openCreatePopup && (
        <Popup open={openCreatePopup} onClose={handleCreateProductVariantItem}>
          <ProductVarientItemForm
            onClose={handleCreateProductVariantItem}
            onSave={createProductVariantItemMutate}
            currentProductVarientItemId={currentProductVariantItemId}
            currentProductVarientId={id}
            varientName={data?.variant?.name}
            button="Add New"
            currentProductId={id}
            loading={createProductVariantItemLoading}
          />
        </Popup>
      )}
      {openUpdatePopup && (
        <Popup open={openUpdatePopup} onClose={handleUpdateProductVariantItem}>
          <ProductVarientItemForm
            onClose={handleUpdateProductVariantItem}
            data={currentProductVariantItemDataId}
            currentProductVarientItemId={currentProductVariantItemId}
            currentProductVarientId={id}
            varientName={data?.variant?.name}
            button="update"
            onUpdate={updateProductVariantItemMutate}
            currentProductId={productId}
            loading={updateProductVariantItemLoading}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteProductVariantItem}>
          <DeleteItem
            onClose={handleDeleteProductVariantItem}
            onClick={deleteProductVariantItem}
            loading={deleteProductVariantItemLoading}
          />
        </Popup>
      )}
    </>
  );
};