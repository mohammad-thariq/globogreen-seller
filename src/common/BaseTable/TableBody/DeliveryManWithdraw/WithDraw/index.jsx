import DeleteIcon from "@mui/icons-material/Delete";

export const WithDraw = ({ onWithDrawData , onDelete}) => {
  return (
    <>
      {onWithDrawData &&
        onWithDrawData[0]?.map((item, index) => (
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
                {item?.created_at.slice(0, 10)}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
              {item?.approved_date == null && "Null"}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item?.account_info}
              </span>
            </td>
            <td className="align-middle text-center">
              <span  className={
                  item?.deliveryman?.status === 1
                    ? "text-success border border-success  text-xxs font-weight-bold badge badge-xxs"
                    : item?.deliveryman?.status === 0
                    ? "text-warning border border-warning text-xxs font-weight-bold badge badge-xxs"
                    : ""
                }>
                {item?.deliveryman?.status === 1
                  ? "Success"
                  : item?.deliveryman?.status === 0
                  ? "Pending"
                  : ""}
              </span>
            </td>
            <td className="align-middle text-center cursor-pointer">
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
