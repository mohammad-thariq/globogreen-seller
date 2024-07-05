import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { stockInventoryHeading } from "@/constant/tableHeading";
import { useMutation, useQuery } from "react-query";
import { StockHistoryAPI } from "@/service/inventory/StockHistoryAPI";
import { NoDataFound } from "@/common/NoDataFound";
import { StockHistoryForm } from "@/common/Form/StockHistoryForm";
import { useRouter } from "next/router";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";

export const StockHistory = () => {
  const router = useRouter();
  const Id = router.query.id;
  const { getStockHistory, addStockHistory, deleteStockHistory } =
    new StockHistoryAPI();
  const { data, refetch } = useQuery(["getStockHistory", Id], getStockHistory, { enabled: !!Id});
  console.log(data, "Stock Data");

  const {
    mutate: createStockHistoryMutate,
    isLoading: createStockHistoryLoading,
  } = useMutation(addStockHistory, {
    onSuccess: (data, variables, context) => {
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      refetch();
      ToastifyFailed(data?.notification);
    },
  });

  return (
    <>
      <Breadcrumb currentPage={"Stock History"} serachEnable />
      <StockHistoryForm
        button="ADD"
        onSave={createStockHistoryMutate}
        loading={createStockHistoryLoading}
      />
      {data >= 1 ? (
        <BaseTable
          tableHeadings={stockInventoryHeading}
          onStockHistoryData={data}
        />
      ) : (
        <NoDataFound message="No Data Available" noHeader />
      )}
    </>
  );
};
