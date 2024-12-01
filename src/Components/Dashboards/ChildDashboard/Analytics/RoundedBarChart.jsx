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
const generateYTicks = (data) => {
  const values = data.map((item) => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Calculate the step based on the range of values
  const range = maxValue - minValue;
  const step = Math.ceil(range / 5); // Create 5 intervals for ticks
  let ticks = [];

  // Start from the minimum value and go up in steps
  for (let i = 0; i <= 5; i++) {
    ticks.push(minValue + step * i);
  }

  return ticks;
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
