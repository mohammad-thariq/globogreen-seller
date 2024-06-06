import React from "react";

export const ProductRequiredFieldsInfo = ({ requiredFields }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card p-5 mb-4 justify-content-fs">
            <h2 className="mb-6">Fields that Required for Product</h2>
            <table>
              {requiredFields?.map((i, index) => (
                <tr key={i?.key}>
                  <td className="productFields">
                    {index + 1}. {i?.key}
                  </td>
                  <td className="productFields">{i?.value}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
