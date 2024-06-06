import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";
import { NoDataFound } from "@/common/NoDataFound";



export const Review = ({
    onReviewData,
    onDelete,
}) => {
  return (
    <>
      {onReviewData &&
        onReviewData?.orderAmounts?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.fname.toLowerCase()}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item?.email}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {""}
              </span>
            </td>

            <td className="align-middle text-center cursor-pointer">
              <span>
                <DeleteIcon
                  sx={{ fontSize: 20 }}
                  onClick={()=>onDelete(item.id)}
                />
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
