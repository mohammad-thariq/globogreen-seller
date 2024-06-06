import { Breadcrumb } from "@/common/Breadcrumb";
import { ImportFiles } from "./Components/ImportFiles";
import { Button } from "@/common/Button";
import { Redirect } from "@/helper/base";
import { ProductRequiredFieldsInfo } from "./Components/ProductRequiredFieldsInfo";
import { ProductRequiredFieldsConst } from "@/constant/ProductRequiredFieldsConstant";

export const ProductBulkImport = () => {
  const handleNavigateProduct = () => {
    Redirect("/admin/products");
  };
  return (
    <>
      <Breadcrumb currentPage={"Product Bulk Import"} serachEnable />
      <div className="flex ms-4 mb-4">
        <Button
          name="Product List"
          color="#fff"
          bg="#23d24f"
          type="button"
          w="200px"
          icon="fa fa-bars"
          onClick={handleNavigateProduct}
        />
      </div>
      <ImportFiles name="Import File" />
      <ProductRequiredFieldsInfo requiredFields={ProductRequiredFieldsConst} />
    </>
  );
};
