import EditNoteIcon from "@mui/icons-material/EditNote";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const ProductVariant = ({ onProductVariantData, onUpdate, onNavigate, onDelete }) => {
  return (
    <>
      {onProductVariantData &&
        onProductVariantData?.variants?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {index + 1}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.name}
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
                <AllInboxIcon
                  titleAccess="Product Variant"
                  sx={{ fontSize: 20 }}
                  onClick={() => onNavigate(item.id, item.product_id)}
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