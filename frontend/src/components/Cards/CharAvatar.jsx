import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${
        width || "w-20"
      } ${height} || 'h-20' ${style} || '' flex items-center justify-center rounded-full text-gray-900 font-medium`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
