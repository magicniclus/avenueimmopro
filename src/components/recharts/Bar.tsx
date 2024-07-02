import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BarProps = {
  data: Array<{ name: string; value: number }>;
  barName: string;
  barColor: string;
  height?: number;
};

const BarComponent: React.FC<BarProps> = ({
  data,
  barName,
  barColor,
  height = 250,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name={barName} fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarComponent;
