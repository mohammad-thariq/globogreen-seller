import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { router } from "next/router";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const MegaMenuSubCategoriesTable = (props) => {
  return (
    <>
      {props?.onMegaMenuSubCategories &&
        props?.onMegaMenuSubCategories?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {index + 1}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <ProductStatus status={item?.status} />
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold cursor-pointer">
                <span>
                  <EditNoteIcon
                    sx={{ fontSize: 25 }}
                    onClick={() =>
                      props?.onUpdate(item.id)
                    }
                  />
                </span>
                {"  "}
                <span>
                  <DeleteIcon
                    sx={{ fontSize: 20 }}
                    onClick={() => props?.onDelete(item.id)}
                  />
                </span>
              </span>{" "}
            </td>
          </tr>
        ))}
    </>
  );
};
