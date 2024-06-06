import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditNoteIcon from "@mui/icons-material/EditNote";

export const PendingWithdraw = ({ onPendingWithdrawData, onDelete }) => {
  return (
    <>
      {onPendingWithdrawData &&
        onPendingWithdrawData?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item?.id}
              </span>
            </td>
            <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
                {item?.deliveryman?.fname?.toLowerCase() +
                  " " +
                  item?.deliveryman?.lname?.toLowerCase()}
              </span>
            </td>
            <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
                {item?.method}
              </span>
            </td>
            <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
                {item?.withdraw_charge}
              </span>
            </td>
            <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
                {item?.total_amount}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item?.withdraw_amount}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                <ProductStatus status={item?.status} />
              </span>
            </td>
            <td className="align-middle text-center cursor-pointer">
              {/* <span>
                <EditNoteIcon
                  sx={{ fontSize: 25 }}
                  onClick={() => onUpdate(item.id)}
                />
              </span>{" "} */}
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
