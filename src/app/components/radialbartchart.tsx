'use client';

import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

// Dados do gráfico
const data = [
  {
    name: 'Jan',
    value: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    fill: '#8884d8',
  },
  {
    name: 'Fev',
    value: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    fill: '#83a6ed',
  },
  {
    name: 'Mar',
    value: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    fill: '#8dd1e1',
  },
  {
    name: 'Abr',
    value: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    fill: '#82ca9d',
  },
  {
    name: 'Mai',
    value: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    fill: '#a4de6c',
  },
  {
    name: 'Jun',
    value: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    fill: '#d0ed57',
  },
];

// Componente de Tooltip personalizado
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-purple-500 shadow rounded-[5px] p-5 text-white">
        <p className="label">{`${name}: ${value}`}</p>
      </div>
    );
  }
  return null;
};

// Componente principal
export const RadialBart = () => {
  return (
    <div className='dark bg-white shadow flex w-4/6 flex-col gap-3 rounded-[5px] border-2 border-purple-500 p-5 text-purple-600 dark:bg-slate-950 dark:border-purple-600'>
      <section className='flex justify-between gap-2 text-purple-500 pb-2'>
        <p>Gráfico-de-Barras</p>
      </section>
        <ResponsiveContainer width={"100%"} height={350}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={30} data={data} >
            <RadialBar dataKey="value" />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
  );
};

export default RadialBart;
