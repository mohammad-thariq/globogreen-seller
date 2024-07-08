import { Breadcrumb } from "@/common/Breadcrumb";
import { MyShopForm } from "@/common/Form/MyShopForm";
import { Loader } from "@/common/Loader";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { MyShopAPI } from "@/service/myShop/MyShopAPI";
import { useMutation, useQuery } from "react-query";

export const MyShop = () => {
  const { myShop, editMyShop } = new MyShopAPI();
  const { data, isLoading, refetch } = useQuery(["myShop"], myShop);

  const { mutate: updateEditMyShopMutate, isLoading: updateEditMyShopLoading } =
    useMutation(editMyShop, {
      onSuccess: (data, variables, context) => {
        ToastifySuccess(data?.message);
        refetch();
      },
      onError: (data, variables, context) => {
        ToastifyFailed(data?.message);
      },
    });

  console.log(data, "Myshop");

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Breadcrumb currentPage={"My Shop"} serachEnable />
      {data && (
        <MyShopForm
          data={data}
          onUpdate={updateEditMyShopMutate}
          loading={updateEditMyShopLoading}
        />
      )}
    </>
  );
};
