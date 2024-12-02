import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';



const RoundedRectangle = (props) => {
  const { x, y, width, height } = props;

  return (
    <g>
      {/* Define a gradient for the bar */}
      <defs>
        <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1e68" /> {/* Light violet */}
          <stop offset="50%" stopColor="#1e50dce3" /> {/* Darker violet */}
          <stop offset="100%" stopColor="#0a1e68" /> {/* Back to light violet */}
        </linearGradient>
      </defs>

      {/* Apply the gradient to the rect */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        ry={10}
        fill="url(#violetGradient)" // Using the gradient here
      />
    </g>
  );
};

// Function to generate Y-axis ticks dynamically
const generateYTicks = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    // Return a default tick range if data is invalid or empty
    return [0, 1, 2, 3, 4, 5];
  }

  const values = data.map((item) => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  if (minValue === maxValue) {
    const adjustedMin = Math.floor(minValue === 0 ? 0 : minValue - 1);
    const adjustedMax = Math.ceil(maxValue + 1);
    return [adjustedMin, (adjustedMin + adjustedMax) / 2, adjustedMax].map(Math.round);
  }

  // Calculate the step size, ensuring it is an integer
  const range = maxValue - minValue;
  const step = Math.max(1, Math.ceil(range / 5)); // At least 1 to avoid small fractional steps

  const ticks = [];
  for (let i = 0; i <= 5; i++) {
    ticks.push(Math.round(minValue + step * i));
  }

  // Ensure 0 is included if it's within the range
  if (minValue < 0 && maxValue > 0 && !ticks.includes(0)) {
    ticks.push(0);
  }

  return [...new Set(ticks)].sort((a, b) => a - b); // Deduplicate and sort ticks
};


export default function RoundedBarChart({ data }) {
  const yTicks = generateYTicks(data); // Automatically generate Y ticks

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} ticks={yTicks}  />
        <Tooltip />
        <Bar dataKey="value" fill="#0a1e68" barSize={20} shape={<RoundedRectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
}
