import React from "react";

const InfoCard = ({ icon, label, value, color = "bg-primary" }) => {
  return (
    <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px] font-semibold text-gray-800">
          Ksh. {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
