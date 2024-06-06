import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";
import Image from "next/image";
import { BaseUrls } from "../../../../../../env";

export const Service = ({
  onServiceData,
  onUpdate,
  onDelete,
}) => {
  return (
    <>
      {onServiceData &&
        onServiceData?.services?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
              {index + 1}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.title}
              </span>
            </td>
            <td className="align-middle text-center">
            <i
              className={`${item.icon} text-secondary text-sm font-weight-bold`}
            ></i>
          </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.description}
              </span>
            </td>
            <td className="align-middle text-center">
              <ProductStatus status={item?.status} />
            </td>

            <td className="align-middle text-center cursor-pointer">
              <span>
                <EditNoteIcon
                  sx={{ fontSize: 25 }}
                  onClick={() => onUpdate(item.id)}
                />
              </span>{" "}
              <span>
                <DeleteIcon
                  sx={{ fontSize: 20 }}
                  onClick={() => onDelete(item.id)}
                />
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
