import React from "react";

export const SideOptions = ({ data, onClick, active }) => {
  return (
    <div className="flex flex-column">
      <div
        className={active ? "border-gray rounded-2 p-2 text-center mb-2 cursor-pointer active-options" : "border-gray rounded-2 p-2 text-center mb-2 cursor-pointer text-success"}
        onClick={() => onClick(data.value)}
      >
        <p className="mb-0 mt-0 fs-14">{data.name}</p>
      </div>
    </div>
  );
};
