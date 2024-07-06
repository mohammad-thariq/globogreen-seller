import DeleteIcon from "@mui/icons-material/Delete";


export const StockHistory = ({onStockHistoryData, onDelete}) => {
    return (
      <>
        {onStockHistoryData &&
          onStockHistoryData?.histories
          ?.map((item, index) => (
            <tr key={index}>
              <td className="align-middle text-center">
                <span className="text-secondary text-sm font-weight-bold">
                  {item.id}
                </span>
              </td>
              <td className="align-middle text-center">
                <span className="text-secondary text-sm font-weight-bold">
                  {item?.stock_in}
                </span>
              </td>
              <td className="align-middle text-center">
                <span className="text-secondary text-sm font-weight-bold">
                  {item?.created_at.slice(0,10)}
                </span>
              </td>
             
              <td className="align-middle text-center cursor-pointer">
                <span>
                  <DeleteIcon sx={{ fontSize: 20 }} 
                  onClick={() =>onDelete(item.id)}
                  />
                </span>
              </td>
            </tr>
          ))}
      </>
     
    );
  };
  