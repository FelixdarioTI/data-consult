'use client'

import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer,Legend,TooltipProps } from 'recharts';
export const PieGraph = () => {
  
  const data = [
    {
      name: "Jan",
      value: Math.floor(Math.random() * 1000),
      fill: '#d0ed57',
  },
  {
      name: "Fev",
      value: Math.floor(Math.random() * 1000),
      fill: '#a4de6c',
  },
  {
      name: "Mar",
      value: Math.floor(Math.random() * 1000),
      fill: '#82ca9d',
  },
  {
      name: "Abr",
      value: Math.floor(Math.random() * 1000),
      fill: '#83a6ed',
  },
  {
      name: "May",
      value: Math.floor(Math.random() * 1000),
      fill: '#8884d8',
  },
  {
      name: "Jun",
      value: Math.floor(Math.random() * 1000),
      fill: '#8dd1e1',
  },

  ];
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="bg-purple-500 shadow rounded-[5px] p-5 text-white ">
          <p className="label">{`${name}: ${value}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    
    <div className='dark bg-white shadow flex w-4/6 flex-col gap-3 rounded-[5px] border-2 border-purple-500 p-5 text-purple-600 dark:bg-slate-950 dark:border-purple-600'>
      <section className='flex justify-between gap-2 text-purple-500 pb-2'>
        <p>Gráfico-Pizza</p>
      </section>
      
      <ResponsiveContainer width={"100%"} height={350}>
        <PieChart>
          <Pie 
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={135}
            fill="#a855f7" 
            labelLine = {false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + outerRadius * 0.5;
              const x  = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy  + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text
                  x={x}
                  y={y}
                  fill="#fff" 
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  {value}
                </text>
              );
            }}
          />
          <Tooltip  content={<CustomTooltip />} />
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
