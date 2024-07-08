import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsIcon from "@mui/icons-material/Collections";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Image from "next/image";
import { BaseUrls } from "../../../../../../env";
import { ProductType } from "@/common/BaseTable/TableColumn/ProductType";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const Product = ({
  onProductData,
  onUpdate,
  onDelete,
  onNavigate,
}) => {
  return (
    <>
      {onProductData &&
        onProductData?.products?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {index + 1}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.short_name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.price}
              </span>
            </td>
            <td className="align-middle text-center">
              <Image
                width={70}
                height={70}
                alt=""
                src={
                  `${BaseUrls?.IMAGE_URL}/${item.thumb_image}` ||
                  "/assets/img/placeholder.jpg"
                }
                className="text-secondary text-sm font-weight-bold product-image"
              />
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                <ProductType
                  top={item?.is_top}
                  best={item?.is_best}
                  featured={item?.is_featured}
                  newProduct={item?.new_product}
                />
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
                <CollectionsIcon
                  titleAccess="Product Gallery"
                  sx={{ fontSize: 20 }}
                  onClick={() => onNavigate(item.id, "product-gallery")}
                />
              </span>{" "}
              <span>
                <AllInboxIcon
                  titleAccess="Product Variant"
                  sx={{ fontSize: 20 }}
                  onClick={() => onNavigate(item.id, "product-variant")}
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
