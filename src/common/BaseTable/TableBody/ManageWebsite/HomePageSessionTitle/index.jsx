import EditNoteIcon from "@mui/icons-material/EditNote";

export const HomePageSessionTitle =({onHomepageTitleData,
    onUpdate})=>{
    return (
        <>
        {onHomepageTitleData &&
            onHomepageTitleData?.sections?.map((item, index) => (
              <tr key={index}>
                <td className="align-middle text-center">
                  <span className="text-secondary text-sm font-weight-bold">
                  {item.default}
                  </span>
                </td>
                <td className="align-middle text-center cursor-pointer">
                  <span>
                    <EditNoteIcon
                      sx={{ fontSize: 25 }}
                      onClick={() => onUpdate(item.key)}
                    />
                  </span>
                </td>
              </tr>
            ))}
        </>
    )
}