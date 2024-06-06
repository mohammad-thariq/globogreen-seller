import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useQuery } from "react-query";

export const ProductReviews = () => {
  const { productReview } = new productCateoriesAPI();
  const { data, isLoading, refetch } = useQuery(["productReview"], productReview);

  if (data && data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Products Reviews"} serachEnable />
        <BaseTable/>
    </>
  );
};
