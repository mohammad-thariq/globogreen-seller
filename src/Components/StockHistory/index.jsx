import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { stockInventoryHeading } from "@/constant/tableHeading";
import { useMutation, useQuery } from "react-query";
import { StockHistoryAPI } from "@/service/inventory/StockHistoryAPI";
import { NoDataFound } from "@/common/NoDataFound";
import { StockHistoryForm } from "@/common/Form/StockHistoryForm";
import { useRouter } from "next/router";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { useState } from "react";

export const StockHistory = () => {
  const router = useRouter();
  const Id = router.query.id;
  const { getStockHistory, addStockHistory, deleteStockHistory } =
    new StockHistoryAPI();
  const { data, refetch } = useQuery(["getStockHistory", Id], getStockHistory, {
    enabled: !!Id,
  });
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentStockHistoryId, setCurrentStockHistoryId] = useState(null);
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
  const {
    mutate: DeleteStockHistoryMutate,
    isLoading: deleteStockHistoryLoading,
  } = useMutation(deleteStockHistory, {
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

  const handleDeleteStockHistory = (id) => {
    setCurrentStockHistoryId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleOnDeleteStockHistory = () => {
    DeleteStockHistoryMutate({ id: currentStockHistoryId });
  };
  return (
    <>
      <Breadcrumb currentPage={"Stock History"} serachEnable />
      <StockHistoryForm
        button="ADD"
        onSave={createStockHistoryMutate}
        loading={createStockHistoryLoading}
      />
        <BaseTable
          tableHeadings={stockInventoryHeading}
          onStockHistoryData={data}
          onDelete={handleDeleteStockHistory}
          length={data?.histories.length === 0}
        />
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteStockHistory}>
          <DeleteItem
            onClose={handleDeleteStockHistory}
            onClick={handleOnDeleteStockHistory}
            loading={deleteStockHistoryLoading}
          />
        </Popup>
      )}
    </>
  );
};
