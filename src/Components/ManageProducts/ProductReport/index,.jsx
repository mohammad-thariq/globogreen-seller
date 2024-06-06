import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { productReportTableHeading } from "@/constant/tableHeading";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useQuery } from "react-query";

export const ProductsReport = () => {
  const { productReport } = new productCateoriesAPI();
  const { data, isLoading, refetch } = useQuery(["productReport"], productReport);
  
  if (data && data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      <Breadcrumb currentPage={"Products Report"} serachEnable />
        <BaseTable tableHeadings={productReportTableHeading} />
    
    </>
  );
};
