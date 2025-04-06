import React from "react";
import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {

  // Apply dynamic styles based on type
  const getAmountStyles = () => {
    return type === "income" 
      ? "bg-green-50 text-green-500" 
      : "bg-red-50 text-red-500";
  };

  return (
    <div className="group relative flex items-center justify-between gap-4 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full shrink-0">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>

      {/* Amount + Delete */}
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-semibold ${getAmountStyles()}`}
        >
          Ksh. {amount}
        </span>

        {/* Delete Button */}
        {!hideDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-600 transition"
            onClick={onDelete}
          >
            <LuTrash2 size={20} />
          </button>
        )}

        {/* Trending Icon and Amount */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md">
          <h6 className="text-sm font-semibold">
            {type === "income" ? "+" : "-"} Ksh. {amount}
          </h6>
          {type === "income" ? (
            <LuTrendingUp className="text-green-500" />
          ) : (
            <LuTrendingDown className="text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
