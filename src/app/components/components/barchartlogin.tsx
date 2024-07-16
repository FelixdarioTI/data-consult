'use client'

import { CandlestickChart } from 'lucide-react'
import {
    BarChart as BarGraph,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Bar,
    Tooltip
} from 'recharts'

const salesData = [
    {
        month: "Jan",
        total: Math.floor(Math.random() * 1000)
    },
    {
        month: "Feb",
        total: Math.floor(Math.random() * 1000)
    },
    {
        month: "Mar",
        total: Math.floor(Math.random() * 1000)
    },
    {
        month: "Apr",
        total: Math.floor(Math.random() * 1000)
    },
    {
        month: "May",
        total: Math.floor(Math.random() * 1000)
    },
    {
        month: "Jun",
        total: Math.floor(Math.random() * 1000)
    }
]

export const BarChart = () => {
    return (
            <div className='dark bg-white shadow flex w-4/6 flex-col gap-3 rounded-[5px] border-2 border-purple-500 p-5 text-purple-600 dark:bg-slate-950 dark:border-purple-600'>
            <section className='flex justify-between gap-2 text-purple-500 pb-2'>
                <p>Gráfico-Colunas</p>
            </section>
            <ResponsiveContainer width={"100%"} height={350}>
                <BarGraph data={salesData} margin={{top: 0, bottom: 0, right: 0, left: -15}}>

                <XAxis 
                    dataKey={"month"}
                    tickLine={false}
                    axisLine={true}
                    stroke='#a855f7'
                    fontSize={13}
                    padding={{ left: 0, right: 0}}
                />
                <YAxis 
                    dataKey={"total"}
                    tickLine={false}
                    axisLine={true}
                    stroke='#a855f7'
                    fontSize={13}
                    padding={{ top: 0, bottom: 0}}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip/>
                <Bar dataKey={"total"} radius={[5, 5, 0, 0]} stroke='#a855f7' fill='#a855f7'/>
               </BarGraph>
            </ResponsiveContainer>
        </div>
        
    )
}