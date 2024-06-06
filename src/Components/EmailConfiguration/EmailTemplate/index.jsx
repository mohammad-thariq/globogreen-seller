import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Loader } from "@/common/Loader";
import { PageHeader } from "@/common/PageHeader";
import { emailTemplateTableHeading } from "@/constant/tableHeading";
import { EmailConfigAPI } from "@/service/emailConfiguration/EmailConfigAPI";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export const EmailTemplate = () => {
  const router = useRouter();
  const { emailTemplate } = new EmailConfigAPI();
  const { data, isLoading } = useQuery(["emailTemplate"], emailTemplate);

  const handleNavigate = (id) => {
    router.push(`/admin/email-template/${id}`);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <PageHeader title="Email Template" />
      <Breadcrumb currentPage={"Email Template"} serachEnable />
      <BaseTable
        tableHeadings={emailTemplateTableHeading}
        onEmailTemplateData={data}
        onNavigate={handleNavigate}
      />
    </>
  );
};
