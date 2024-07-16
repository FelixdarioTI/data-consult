'use client'

import { User } from 'lucide-react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip
} from 'recharts'

const numberOfUsersData = [
    {
        month: "Jan",
        users: Math.floor(Math.random() * 1000)
    },
    {
        month: "Feb",
        users: Math.floor(Math.random() * 1000)
    },
    {
        month: "Mar",
        users: Math.floor(Math.random() * 1000)
    },
    {
        month: "Apr",
        users: Math.floor(Math.random() * 1000)
    },
    {
        month: "May",
        users: Math.floor(Math.random() * 1000)
    },
    {
        month: "Jun",
        users: Math.floor(Math.random() * 1000)
    }
]

export const LineGraph = () => {
    return (
        <div className='dark bg-white shadow flex w-4/6 flex-col gap-3 rounded-[5px] border-2 border-purple-500 p-5 text-purple-600 dark:bg-slate-950 dark:border-purple-600'>
            <section className='flex justify-between gap-2 text-purple-500 pb-2'>
                <p>Gráfico-Linhas</p>
            </section>
            <ResponsiveContainer width={"100%"} height={350}>
                <LineChart data={numberOfUsersData} margin={{ top: 0, left: -15, right: 0, bottom: 0}}>

                <Line type='monotone' dataKey="users" stroke='#a855f7' width={50} strokeWidth={3}/>
                <XAxis 
                    dataKey={"month"}
                    tickLine={false}
                    axisLine={true}
                    stroke='#a855f7'
                    fontSize={13}
                    padding={{ left: 0, right: 0}}
                />
                <YAxis 
                    dataKey={"users"}
                    tickLine={false}
                    axisLine={true}
                    stroke='#a855f7'
                    fontSize={13}
                    padding={{ top: 0, bottom: 0}}
                />
                <CartesianGrid strokeDasharray="2 2" className='opacity-50'/>
                <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}