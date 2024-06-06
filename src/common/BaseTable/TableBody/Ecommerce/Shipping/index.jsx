import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShippingRuleType } from "@/constant/statusConst";

export const Shipping = ({
  onShippingData,
  onUpdate,
  onDelete,
}) => {
  return (
    <>
      {onShippingData &&
        onShippingData?.shippings?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.shipping_rule}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.condition_from}{item?.type === "base_on_weight" ? '(g)' : item?.type === "base_on_quantity" ? "(qty)" : "(Rs)" } - {item.condition_to}{item?.type === "base_on_weight" ? '(g)' : item?.type === "base_on_quantity" ? "(qty)" : "(Rs)" }
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.shipping_fee}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.max_quantity}
              </span>
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
