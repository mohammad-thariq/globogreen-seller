import { Breadcrumb } from "@/common/Breadcrumb";
import { NoDataFound } from "@/common/NoDataFound";

export const AwaitingApproval = () => {
  return (
    <>
      <Breadcrumb currentPage={"Awaiting Approval"} serachEnable />
      <NoDataFound noHeader/>
    </>
  );
};
