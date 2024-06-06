import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { useEffect, useState } from "react";
import { ExisitngBanner } from "../ExistingBanner";
import { ManageCategoriesApi } from "@/service/manageCategories/manageCategoriesAPI";
import {  useQuery } from "react-query";
import { BaseUrls } from "../../../../env";
import { CategoryAddForm } from "@/common/Form/ManageCategoriesForms/CategoriesAddForm";
import { popularCateoryTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";

export const PopularCategories = () => {
  const [deletePopularCategories, setDeletePopularCategories] = useState(false);
  const [createPopularCategories, setCreatePopularCategories] = useState(false);
  const [currentPopularCategoryBanner, setCurrentPopularCategoryBanner] = useState(null)
  const [activePopularCategory, setActivePopularCategory] = useState(null)
  const {popularCategory, productCategory} = new ManageCategoriesApi()
  const {data, isLoading, refetch} = useQuery(['popular-categories'], popularCategory)
  const { data: categories, isLoading: loadingProductCategory } = useQuery(["product-category"], productCategory);


  const handleDeletePopularCategories = (id) => {
    setDeletePopularCategories(!deletePopularCategories);
  };

  const handlePopularCategories = () => {
    setCreatePopularCategories(!createPopularCategories);
  };

  useEffect(() => {
    const getCurrentCategory = data?.popularCategories?.find((i) => ( i?.id === categories?.pupoularCategory?.id))
    setCurrentPopularCategoryBanner(getCurrentCategory)
    const getActiveCategory = categories?.categories?.filter((i) => i?.status === 1)
    setActivePopularCategory(getActiveCategory)
  }, [categories?.categories, categories?.pupoularCategory?.id, data?.popularCategories])

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Popular Categories"} serachEnable />
     
      <ExisitngBanner
      loading={loadingProductCategory}
        sidebarBanner="Popular Category Sidebar Banner"
        img={`${BaseUrls?.IMAGE_URL}/${currentPopularCategoryBanner?.category?.image}`}
        alt={"Popular side bar"}
      />
  
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handlePopularCategories}
        />
      </div>
      <BaseTable
        tableHeadings={popularCateoryTableHeading}
        onPopularCategoriesData={data?.popularCategories}
        onDelete={handleDeletePopularCategories}
      />
      {deletePopularCategories && (
        <Popup
          open={deletePopularCategories}
          onClose={handleDeletePopularCategories}
        >
          <DeleteItem onClose={handleDeletePopularCategories} />
        </Popup>
      )}
      {createPopularCategories && (
        <Popup open={createPopularCategories} onClose={handlePopularCategories}>
          <CategoryAddForm
          title="Add Popular category"
          categories={activePopularCategory}
          onClose={handlePopularCategories}
          />
        </Popup>
      )}
    </>
  );
};
