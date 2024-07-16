'use client'
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend ,TooltipProps} from 'recharts';

const data = [
  { name: 'Jan', value: Math.floor(Math.random() * 1000), fill:'#0088FE', },
  { name: 'Fev', value: Math.floor(Math.random() * 1000), fill:'#00C49F',},
  { name: 'Mar', value: Math.floor(Math.random() * 1000), fill:'#FFBB28', },
  { name: 'Abr', value: Math.floor(Math.random() * 1000), fill:'#FF8042', },
  { name: 'May', value: Math.floor(Math.random() * 1000), fill:'#8dd1e1', },
  { name: 'Jun', value: Math.floor(Math.random() * 1000), fill:'#83a6ed', },
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
export const Piepadding = () =>{
    return (
        <div className='dark bg-white shadow flex w-4/6 flex-col gap-3 rounded-[5px] border-2 border-purple-500 p-5 text-purple-600 dark:bg-slate-950 dark:border-purple-600'>
      <section className='flex justify-between gap-2 text-purple-500 pb-2'>
        <p>Gráfico-Pizza</p>
      </section>
      <ResponsiveContainer width={"100%"} height={350}>
        <PieChart width={800} height={400}>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#a855f7"
            paddingAngle={3}
            dataKey="value"
          >
          </Pie>
          <Tooltip  content={<CustomTooltip />} />
          <Legend/>
          </PieChart>
          </ResponsiveContainer>
          </div>
         )
}