import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { stockInventoryHeading } from "@/constant/tableHeading";
import { useQuery } from "react-query";
import { StockHistoryAPI } from "@/service/inventory/StockHistoryAPI";
import { NoDataFound } from "@/common/NoDataFound";
import { StockHistoryForm } from "@/common/Form/StockHistoryForm";

export const StockHistory = () => {
  const { stockHistory } = new StockHistoryAPI();
  const { data, refetch } = useQuery(["stockHistory"], stockHistory);
  console.log(data , "Stock Data")

  return (
    <>
      <Breadcrumb currentPage={"Stock History"} serachEnable />

     <StockHistoryForm data={data} button="ADD"/>
      {data >= 1 ? (
        <BaseTable
          tableHeadings={stockInventoryHeading}
          onStockHistoryData={data}
        />
      ) : (
        <NoDataFound message="No Data Available" />
      )}
    </>
  );
};
