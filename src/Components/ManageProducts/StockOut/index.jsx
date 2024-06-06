import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { stockOutTableheading } from "@/constant/tableHeading";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useQuery } from "react-query";

export const StockOut = () => {
  const { stockOut } = new productCateoriesAPI();
  const { data, isLoading, refetch } = useQuery(["stockOut"], stockOut);
 
  if (data && data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <>
      <Breadcrumb currentPage={"Stock Out"} serachEnable />
        <BaseTable tableHeadings={stockOutTableheading} />
    </>
  );
};

