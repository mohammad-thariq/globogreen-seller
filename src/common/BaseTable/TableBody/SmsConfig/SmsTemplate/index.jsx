import EditNoteIcon from "@mui/icons-material/EditNote";


export const SmsTemplate = ({
    onSmsConfigData,
  onDelete,
  onUpdate,
}) => {
  return (
    <>
      {onSmsConfigData &&
        onSmsConfigData?.templates?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.subject}
              </span>
            </td>
           
            

            <td className="align-middle text-center cursor-pointer">
              <span>
                <EditNoteIcon
                  sx={{ fontSize: 25 }}
                  onClick={()=>onUpdate(item.id)}
                />
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
