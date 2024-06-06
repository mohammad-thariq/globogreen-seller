import DeleteIcon from "@mui/icons-material/Delete";

export const FeaturedCategoriesTable = ({ onfeaturedCategoryData , onDelete}) => {

  return (
    <>
      {onfeaturedCategoryData && onfeaturedCategoryData?.map(
        (item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.category.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold cursor-pointer">
              <DeleteIcon
                      sx={{ fontSize: 20 }}
                      onClick={() => onDelete()}
                    />
              </span>
            </td>
          </tr>
        )
      )}
    </>
  );
};
