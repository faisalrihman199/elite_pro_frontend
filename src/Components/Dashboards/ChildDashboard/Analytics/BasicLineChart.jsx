import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BasicLineChart = ({ data }) => {
  const generateTicks = (data) => {
   
    const values = data.map(item => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Handle case when all values are zero
    if (minValue === 0 && maxValue === 0) {
      return [0]; // Only show zero if all values are zero
    }

    const tickCount = 5; // Desired number of ticks
    
    
    const step = Math.ceil((maxValue - minValue) / tickCount);
    
    const ticks = [];
    for (let i = minValue; i <= maxValue; i += step) {
      ticks.push(i);
    }

    return ticks;
  };



  const yTicks = generateTicks(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
        <XAxis dataKey="name" axisLine={true} tickLine={true} padding={{ left: 20, right: 20 }} />
        <YAxis 
          domain={[
            Math.min(...data.map(d => d.value)),
            Math.max(...data.map(d => d.value) || 1) // Ensure Y-axis can display something even if all values are zero
          ]} 
          axisLine={false} 
          tickLine={false} 
          ticks={yTicks} 
          padding={{ top: 10, bottom: 10 }} 
        />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#153795" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BasicLineChart;
