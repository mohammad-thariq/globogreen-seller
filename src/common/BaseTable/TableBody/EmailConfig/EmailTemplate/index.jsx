import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";
import Image from "next/image";
import { BaseUrls } from "../../../../../../env";

export const EmailTemplate = ({
    onEmailTemplateData,
    onNavigate,
}) => {
  return (
    <>
      {onEmailTemplateData &&
        onEmailTemplateData?.templates?.map((item, index) => (
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
                  onClick={()=>onNavigate(item.id)}
                />
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
