import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  color,
  showTextAnchor,
}) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={135}
            innerRadius={100}
            labelLine={false}
            label={({ name }) => name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
          </Pie>
          <Tooltip content={CustomToolTip} />
          <Legend content={CustomLegend} />

          {/* Displaying text only once */}
          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-25} // Adjusted for better positioning
                textAnchor="middle"
                fill="#666"
                fontSize="14px"
              >
                {label}
              </text>

              <text
                x="50%"
                y="50%"
                dy={8} // Adjusted for better positioning
                textAnchor="middle"
                fill="#333"
                fontSize="16px"
                fontWeight="semi-bold"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
