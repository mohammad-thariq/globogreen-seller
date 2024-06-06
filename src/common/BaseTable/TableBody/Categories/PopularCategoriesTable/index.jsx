import DeleteIcon from "@mui/icons-material/Delete";

export const PopularCategoriesTable = ({ onPopularCategoriesData , onDelete }) => {
  
  return (
    <>
      {onPopularCategoriesData && onPopularCategoriesData?.map(
        (item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.category.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold curson-pointer">
              <DeleteIcon
                      sx={{ fontSize: 20 }}
                      onClick={() => onDelete(item.id)}
                    />
              </span>
            </td>
          </tr>
        )
      )}
    </>
  );
};
