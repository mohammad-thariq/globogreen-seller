import { Breadcrumb } from "@/common/Breadcrumb";
import { PageHeader } from "@/common/PageHeader";

export const Message = () => {
  return (
    <>
      <PageHeader title="Message" />
      <Breadcrumb currentPage={"Message"} serachEnable />
    </>
  );
};
