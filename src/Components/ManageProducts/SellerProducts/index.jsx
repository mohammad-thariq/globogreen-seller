import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Button } from "@/common/Button";
import { SellerProductForm } from "@/common/Form/ProductCategoriesForm/SellerProductForm";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { SellerProductTableHeading } from "@/constant/tableHeading";
import { productCateoriesAPI } from "@/service/productCategories/productCategoriesAPI";
import { useState } from "react";
import { useQuery } from "react-query";

export const SellerProducts = () => {
  const { sellerProducts, createProductCategory, updateProductCategory } =
    new productCateoriesAPI();
  const { data,isLoading, refetch } = useQuery(["sellerProducts"], sellerProducts);
  const [createSellerProduct, setCreateSellerProduct] = useState(false);
  const [updateSellerProduct, setUpdateSellerProduct] = useState(false)
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentSellerProductId, setCurrentSellerProductId] = useState(null);
  const [currentSellerProductDataId, setCurrentSellerProductDataId] = useState(null);

  const handleDeleteSellerProd = () => {
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleCreateSellerProduct = ()=>{
    setCreateSellerProduct(!createSellerProduct)
  }

  const handleUpdateSellerProduct = (id)=>{
    setUpdateSellerProduct(!updateSellerProduct)
    setCurrentSellerProductId(id);
    const getSellerProductById = data?.products
    ?.find((i) => i?.id === id);
    setCurrentSellerProductDataId(getSellerProductById);
  }

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Seller Products"} serachEnable />
      <div className="flex ms-4">
        <Button
          name="Add New"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-plus"
          onClick={handleCreateSellerProduct}
        />
      </div>
      <BaseTable
        tableHeadings={SellerProductTableHeading}
        onSellerProductData={data}
        onDelete={handleDeleteSellerProd}
        onUpdate={handleUpdateSellerProduct}
      />
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteSellerProd}>
          <DeleteItem handleDeleteSellerProd={handleDeleteSellerProd} />
        </Popup>
      )}
      {createSellerProduct &&
      (
        <Popup open={createSellerProduct} onClose={handleCreateSellerProduct}>
            <SellerProductForm handleCreateSellerProduct={handleCreateSellerProduct} button="Add New"/>
        </Popup>
      
      )
      }

      {updateSellerProduct && (
          <Popup open={updateSellerProduct} onClose={handleUpdateSellerProduct}>
            <SellerProductForm handleUpdateSellerProduct={handleUpdateSellerProduct} data={currentSellerProductDataId} button="update" currentCategoryId={currentSellerProductId}/>
          </Popup>
        
      )}
    </>
  );
};
