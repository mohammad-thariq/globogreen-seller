import DeleteIcon from "@mui/icons-material/Delete";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import Image from "next/image";
import { BaseUrls } from "../../../../../../env";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const ProductDetailGallery = ({ onProductDetailsData, onUpdate, onDelete }) => {
  return (
    <>
      {onProductDetailsData &&
        onProductDetailsData?.gallery?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <Image
                width={70}
                height={70}
                alt=""
                src={
                  `${BaseUrls?.IMAGE_URL}/${item?.image}` ||
                  "/assets/img/placeholder.jpg"
                }
                className="text-secondary text-sm font-weight-bold product-image"
              />
            </td>
            <td className="align-middle text-center cursor-pointer"  onClick={() => onUpdate(item.id)}>
              <ProductStatus status={item?.status} />
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