import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { MegaMenuCategoriesForm } from "@/common/Form/ManageCategoriesForms/MegaMenuCategoriesForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { MegaMenuCategoriesTableHeading } from "@/constant/tableHeading";
import { ManageCategoriesApi } from "@/service/manageCategories/manageCategoriesAPI";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export const MegaMenuCategories = () => {
  const [createMegaMenuCategories, setCreateMegaMenuCategories] =
    useState(false);
  const [updateMegaMenuCategories, setUpdateMegaMenuCategories] =
    useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentMegaMenuCategoryId, setCurrentMegaMenuCategoryId] =
    useState(null);
  const [currentMegaMenuCategoryDataId, setCurrentMegaMenuCategoryDataId] =
    useState(null);

  const {
    productCategory,
    megaMenuCategory,
    createProductMegaMenuCategory,
    updateProductMegaMenuCategory,
    deleteProductMegaMenuCategory,
  } = new ManageCategoriesApi();

  const { data, isLoading, refetch } = useQuery(["Mega-menu-category"], megaMenuCategory);
  const { data: getCategory } = useQuery(["product-category"], productCategory);

  const {
    mutate: createMegaMenuCategoryMutate,
    isLoading: createMegaMenuCategoryLoading,
  } = useMutation(createProductMegaMenuCategory, {
    onSuccess: (data, variables, context) => {
      setCreateMegaMenuCategories(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      setCreateMegaMenuCategories(true);
      refetch();
      ToastifyFailed(data?.notification);
    },
  });

  const {
    mutate: updateMegaMenuCategoryMutate,
    isLoading: updateMegaMenuLoading,
  } = useMutation(updateProductMegaMenuCategory, {
    onSuccess: (data, variables, context) => {
      setUpdateMegaMenuCategories(false);
      ToastifySuccess(data?.notification);
      refetch();
      

    },
    onError: (data, variables, context) => {
      setUpdateMegaMenuCategories(true);
      ToastifyFailed(data?.notification);
      refetch();
    },
  });

  const {
    mutate: deleteMegaMenuCategoryMutate,
    isLoading: deleteMegaMenuCategoryLoading,
  } = useMutation(deleteProductMegaMenuCategory, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.notification);
      refetch();
      
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.notification);
      refetch();
     
    },
  });

  const handleCreateMegaMenuCategories = () => {
    setCreateMegaMenuCategories(!createMegaMenuCategories);
  };

  const handleUpdateMegaMenuCategories = (id) => {
    setCurrentMegaMenuCategoryId(id);
    const getMegaMenuCategoryById = data?.categories?.find((i) => i?.id === id);
    setCurrentMegaMenuCategoryDataId(getMegaMenuCategoryById);
    setUpdateMegaMenuCategories(!updateMegaMenuCategories);
  };

  const handleDeleteOrder = (id) => {
    setCurrentMegaMenuCategoryId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteMegaMenuCategory = () => {
    deleteMegaMenuCategoryMutate({ id: currentMegaMenuCategoryId });
  };

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Mega Menu Categories"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateMegaMenuCategories}
        />
      </div>
      <BaseTable
        tableHeadings={MegaMenuCategoriesTableHeading}
        onMegaMenuCategoriesData={data}
        onUpdate={handleUpdateMegaMenuCategories}
        onDelete={handleDeleteOrder}
      />
      {createMegaMenuCategories && (
        <Popup
          open={createMegaMenuCategories}
          onClose={handleCreateMegaMenuCategories}
        >
          <MegaMenuCategoriesForm
            getCategory={getCategory}
            onClose={handleCreateMegaMenuCategories}
            button="Add New"
            onSave={createMegaMenuCategoryMutate}
            loading={createMegaMenuCategoryLoading}
          />
        </Popup>
      )}
      {updateMegaMenuCategories && (
        <Popup
          open={updateMegaMenuCategories}
          onClose={handleUpdateMegaMenuCategories}
        >
          <MegaMenuCategoriesForm
            getCategory={getCategory}
            onClose={handleUpdateMegaMenuCategories}
            button="Update"
            onUpdate={updateMegaMenuCategoryMutate}
            loading={updateMegaMenuLoading}
            currentMegaMenuCategoryId={currentMegaMenuCategoryId}
            data={currentMegaMenuCategoryDataId}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteOrder}>
          <DeleteItem
            onClose={handleDeleteOrder}
            onClick={handleOnDeleteMegaMenuCategory}
            loading={deleteMegaMenuCategoryLoading}
          />
        </Popup>
      )}
    </>
  );
};
