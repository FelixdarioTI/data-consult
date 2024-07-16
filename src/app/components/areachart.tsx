'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

// Dados do gráfico
const data = [
  {
    name: 'Jan',
    uv: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    amt: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Fev',
    uv: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    amt: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Mar',
    uv: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    amt: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Abr',
    uv: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    amt: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Mai',
    uv: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    amt: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Jun',
    uv: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    amt: Math.floor(Math.random() * 1000),
  },
];

// Componente de Tooltip personalizado
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, uv } = payload[0].payload;
    return (
      <div className="bg-purple-500 shadow rounded-[5px] p-5 text-white">
        <p className="label">{`${name}: ${uv}`}</p>
      </div>
    );
  }
  return null;
};

// Componente principal
export const AreaCharts = () => {
  return (
    <div className='dark bg-white shadow flex w-4/6 flex-col gap-3 rounded-[5px] border-2 border-purple-500 p-5 text-purple-600 dark:bg-slate-950 dark:border-purple-600'>
      <section className='flex justify-between gap-2 text-purple-500 pb-2'>
        <p>Gráfico-Em-Área</p>
      </section>
        <ResponsiveContainer width={"100%"} height={350}>
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -15,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#a855f7" fill="#a855f7" />
            <YAxis stroke="#a855f7" fill="#a855f7" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="uv" stroke="#a855f7" fill="#a855f7" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
  );
};

export default AreaCharts;
