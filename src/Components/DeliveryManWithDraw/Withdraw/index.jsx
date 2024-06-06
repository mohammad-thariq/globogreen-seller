import { Breadcrumb } from "@/common/Breadcrumb";
import { PageHeader } from "@/common/PageHeader";

export const Withdraw = () => {
  return (
    <>
      <PageHeader title="Withdraw" />
      <Breadcrumb currentPage={"Withdraw"} serachEnable />
    </>
  );
};
