import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageHeader } from "@/common/PageHeader";
import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { emailMainTemplateTableHeading } from "@/constant/tableHeading";
import { EmailConfigAPI } from "@/service/emailConfiguration/EmailConfigAPI";
import { useMutation, useQuery } from "react-query";
import { extractHTML } from "@/utils/removeHtml";
import { mainTemplateVariable } from "@/constant/statusConst";
import { EmailMailTemplateForm } from "@/common/Form/EmailMainTemplate";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { Loader } from "@/common/Loader";

export const MainEmailTemplatePanel = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const { getMainEmailTemplate, updateEmailTemplate } = new EmailConfigAPI();
  const { data, isLoading, refetch } = useQuery(
    ["mailTemplate", id],
    getMainEmailTemplate
  );
  const [mailData, setMailData] = useState([]);
  console.log(id, "id");
  console.log(data, "data");
  console.log(extractHTML(data?.template?.description));

  useEffect(() => {
    if (data) {
      const variable = extractHTML(data?.template?.description);
      const getVariables = variable?.map((each) => {
        console.log(each, "each");
        return {
          variable: each,
          name: mainTemplateVariable[each],
        };
      });
      setMailData(getVariables);
    }
  }, [data]);

  const {
    mutate: updateEmailTemplateMutate,
    isLoading: updateEmailTemplateLoading,
  } = useMutation(updateEmailTemplate, {
    onSuccess: (data, variables, context) => {
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      ToastifyFailed(data?.notification);
    },
  });

  console.log(mailData, "mailData");

  if(isLoading) return <Loader />

  return (
    <>
      <PageHeader title="Email Template" />
      <Breadcrumb currentPage={"Email Template"} serachEnable />
      <BaseTable
        tableHeadings={emailMainTemplateTableHeading}
        onMailTemplateData={mailData}
      />
      {data && (
        <EmailMailTemplateForm
          onData={data?.template}
          onUpdate={updateEmailTemplateMutate}
          loading={updateEmailTemplateLoading}
        />
      )}
    </>
  );
};
