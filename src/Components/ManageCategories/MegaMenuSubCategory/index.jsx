import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { MegaMenuCategoriesForm } from "@/common/Form/ManageCategoriesForms/MegaMenuCategoriesForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { MegaMenuSubCategoryTableHeading } from "@/constant/tableHeading";
import { ManageCategoriesApi } from "@/service/manageCategories/manageCategoriesAPI";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

export const MegaMenuSubCategories = () => {
  const [megaMenuSubData, setMegaMenuSubData] = useState([]);
  const [createMegaMenuSubCategories, setCreateMegaMenuSubCategories] =
    useState(false);
  const [updateMegaMenuSubCategories, setUpdateMegaMenuSubCategories] =
    useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentMegaMenuSubCategoryId, setCurrentMegaMenuSubCategoryId] =
    useState(null);
  const [
    currentMegaMenuSubCategoryDataId,
    setCurrentMegaMenuSubCategoryDataId,
  ] = useState(null);
  const router = useRouter();
  const {
    productSubCategory,
    updateProductMegaMenuSubCategory,
    createProductMegaMenuSubCategory,
    deleteProductMegaMenuSubCategory,
  } = new ManageCategoriesApi();
  const { data, isLoading, refetch } = useQuery(
    ["product-sub-category"],
    productSubCategory
  );
  console.log(data, "data");

  useEffect(() => {
    if (data) {
      const getSubCategoryById = data?.subCategories?.filter(
        (i) => i?.category_id == router?.query?.id
      );
      setMegaMenuSubData(getSubCategoryById);
      console.log(getSubCategoryById, "getSubCategoryById");
    }
  }, [data, router?.query?.id]);

  const {
    mutate: createMegaMenuSubCategoryMutate,
    isLoading: createMegaMenuSubCategoryLoading,
  } = useMutation(createProductMegaMenuSubCategory, {
    onSuccess: (data, variables, context) => {
      setCreateMegaMenuSubCategories(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      setCreateMegaMenuSubCategories(true);
      refetch();
      ToastifyFailed(data?.notification);
    },
  });

  const {
    mutate: updateMegaMenuSubCategoryMutate,
    isLoading: updateMegaMenuSubLoading,
  } = useMutation(updateProductMegaMenuSubCategory, {
    onSuccess: (data, variables, context) => {
      setUpdateMegaMenuSubCategories(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      setUpdateMegaMenuSubCategories(true);
      ToastifyFailed(data?.notification);
      refetch();
    },
  });

  const {
    mutate: deleteMegaMenuCategoryMutate,
    isLoading: deleteMegaMenuCategoryLoading,
  } = useMutation(deleteProductMegaMenuSubCategory, {
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

  const handleCreateMegaMenuSubCategories = () => {
    setCreateMegaMenuSubCategories(!createMegaMenuSubCategories);
  };

  const handleUpdateMegaMenuSubCategories = (id) => {
    setCurrentMegaMenuSubCategoryId(id);
    const getMegaMenuSubCategoryById = data?.subCategories?.find(
      (i) => i?.id === id
    );
    setCurrentMegaMenuSubCategoryDataId(getMegaMenuSubCategoryById);
    setUpdateMegaMenuSubCategories(!updateMegaMenuSubCategories);
  };

  const handleDeleteOrder = (id) => {
    setCurrentMegaMenuSubCategoryId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteMegaMenuSubCategory = () => {
    deleteMegaMenuCategoryMutate({ id: currentMegaMenuSubCategoryId });
  };

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Mega Menu Sub Categories"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateMegaMenuSubCategories}
        />
      </div>
      <BaseTable
        tableHeadings={MegaMenuSubCategoryTableHeading}
        onMegaMenuSubData={megaMenuSubData}
        onUpdate={handleUpdateMegaMenuSubCategories}
        onDelete={handleDeleteOrder}
      />
      {createMegaMenuSubCategories && (
        <Popup
          open={createMegaMenuSubCategories}
          onClose={handleCreateMegaMenuSubCategories}
        >
          <MegaMenuCategoriesForm
            getCategory={megaMenuSubData}
            onClose={handleCreateMegaMenuSubCategories}
            button="Add New"
            onSave={createMegaMenuSubCategoryMutate}
            loading={createMegaMenuSubCategoryLoading}
          />
        </Popup>
      )}
      {updateMegaMenuSubCategories && (
        <Popup
          open={updateMegaMenuSubCategories}
          onClose={handleUpdateMegaMenuSubCategories}
        >
          <MegaMenuCategoriesForm
            getCategory={megaMenuSubData}
            onClose={handleUpdateMegaMenuSubCategories}
            button="Update"
            onUpdate={updateMegaMenuSubCategoryMutate}
            loading={updateMegaMenuSubLoading}
            currentMegaMenuCategoryId={currentMegaMenuSubCategoryId}
            data={currentMegaMenuSubCategoryDataId}
          />
        </Popup>
      )}
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteOrder}>
          <DeleteItem
            onClose={handleDeleteOrder}
            onClick={handleOnDeleteMegaMenuSubCategory}
            loading={deleteMegaMenuCategoryLoading}
          />
        </Popup>
      )}
    </>
  );
};
