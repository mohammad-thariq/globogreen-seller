import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { useEffect, useState } from "react";
import { ExisitngBanner } from "../ExistingBanner";
import { Button } from "@/common/Button";
import { ManageCategoriesApi } from "@/service/manageCategories/manageCategoriesAPI";
import { useQuery } from "react-query";
import { CategoryAddForm } from "@/common/Form/ManageCategoriesForms/CategoriesAddForm";
import { BaseUrls } from "../../../../env";
import { featuredCategoryTableHeading } from "@/constant/tableHeading";
import { NoDataFound } from "@/common/NoDataFound";
import { Loader } from "@/common/Loader";
export const FeaturedCategories = () => {
  const [deletePopularCategories, setDeletePopularCategories] = useState(false);
  const [featuredCategoryOpen, setFeaturedCategoryOpen] = useState(false);
  const [currentFeaturedCategoryBanner, setCurrentFeaturedCategoryBanner] = useState(null)
  const [activeFeautedCategory, setActiveFeautedCategory] = useState(null)
  const { featuredCategory, productCategory } = new ManageCategoriesApi();
  const { data, isLoading, refetch } = useQuery(["popular-categories"], featuredCategory);
  const { data: categories, isLoading: loadingProductCategory } = useQuery(["product-category"], productCategory);


  useEffect(() => {
    const getCurrentCategory = data?.popularCategories?.find((i) => ( i?.id === categories?.pupoularCategory?.id))
    setCurrentFeaturedCategoryBanner(getCurrentCategory)
    const getActiveCategory = categories?.categories?.filter((i) => i?.status === 1)
    setActiveFeautedCategory(getActiveCategory)
  }, [categories?.categories, categories?.pupoularCategory?.id, data?.popularCategories])

  const handleDeletePopularCategories = () => {
    setDeletePopularCategories(!deletePopularCategories);
  };
  const handleCreateFeaturedCategory = () => {
    setFeaturedCategoryOpen(!featuredCategoryOpen);
  };
  
  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Featured Categories"} serachEnable />
      <ExisitngBanner
      loading={loadingProductCategory}
        sidebarBanner="Featured Category Sidebar Banner"
        img={`${BaseUrls?.IMAGE_URL}/${currentFeaturedCategoryBanner?.category?.image}`}
        alt={"Featured side bar"}
      />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateFeaturedCategory}
        />
      </div>
      <BaseTable
        tableHeadings={featuredCategoryTableHeading}
        onfeaturedCategoryData={data?.featuredCategories}
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
      {featuredCategoryOpen && (
        <Popup
          open={featuredCategoryOpen}
          onClose={handleCreateFeaturedCategory}
        >
          <CategoryAddForm
            title="Add featured category"
            categories={activeFeautedCategory}
            onClose={handleCreateFeaturedCategory}
          />
        </Popup>
      )}
    </>
  );
};
