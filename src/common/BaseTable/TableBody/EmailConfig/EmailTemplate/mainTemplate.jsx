export const MailTemplate = ({
    onMailTemplateData,
}) => {
  return (
    <>
      {onMailTemplateData &&
        onMailTemplateData?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.variable}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.name}
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
