'use client'
import React, { useState, useEffect } from "react";
import Logo from "../images/logo.png";
import UserPerfil from "../images/perfil-teste.jpg"
import { LineGraph } from "../components/linegraph";
import { BarChart } from "../components/barchart";
import { PieGraph } from "../components/piechart";
import { AreaCharts } from "../components/areachart";
import { ModeToggle } from "@/components/toggle";
import { RadialBart } from "@/app/components/radialbartchart";
import { Piepadding } from "@/app/components/piechartpadding";
import { BarChart3, LineChart, PieChart, Check, X, AreaChart, BarChartBig, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { UsuarioService } from "../../../service/UsuarioService";

const usuarioService = new UsuarioService();

export default function Menu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 1000); 
    } else {
      router.push('/');
    }
  }, [router]);


  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(true);
  const [isModalOpen2, setIsModalOpen2] = useState(true);
  const [isModalOpen3, setIsModalOpen3] = useState(true);

  const toggleModal1 = () => {
    setIsModalOpen1(!isModalOpen1);
    setIsChecked(!isChecked);
  };

  const toggleModal2 = () => {
    setIsModalOpen2(!isModalOpen2);
    setIsChecked2(!isChecked2);
  };

  const toggleModal3 = () => {
    setIsModalOpen3(!isModalOpen3);
    setIsChecked3(!isChecked3);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 w-24 h-24 aspect-square rounded-full"
        >
          <div
            className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
          ></div>
        </div>
      </div>
    );
  }
    return(
<>
<div className="">
<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-950 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <a href="/bne" className="flex ms-2 md:me-24">
          <img src={Logo.src}  className="h-16 me-3" alt=" Logo" />
        </a>
      </div>
      <div className="flex items-center">
      <div className="flex items-center ms-3">
          <div className="pr-8"> 
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <LineChart className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <PieChart className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={toggleModal1}>
                 Gráfico de Coluna
                 <label className="text-gray-900 dark:text-white ml-4">
                     {isChecked ? <X/> : <Check/>}
                  </label>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleModal2}>
                 Gráfico de linha
                 <label className="text-gray-900 dark:text-white ml-4">
                     {isChecked2 ? <X/> : <Check/>}
                  </label>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleModal3}>
                 Gráfico de Pizza
                 <label className="text-gray-900 dark:text-white ml-4">
                     {isChecked3 ? <X/> : <Check/>}
                  </label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
            </div>
            <div>
          <div className="flex items-center ms-3">
          <div className="pr-8"> 
               <ModeToggle/>
            </div>
            <div>
         
               </div>
                <a href="/user">
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <span className="sr-only">Menu</span>
                <img className="w-8 h-8 rounded-full" src={UserPerfil.src} alt="user photo"/>
              </button>
              </a>
            </div>
          </div>
        </div>
    </div>
  </div>
  </div>
</nav>

<aside id="logo-sidebar" className="fixed top-8 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-slate-950 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-slate-950">
      <ul className="space-y-2 font-medium">
         <li>
            <a href="/bne" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                  <BarChart3/>
                  </div>
               <span className="ms-3">Bne</span>
            </a>
         </li>
         <li>
            <a href="/lugarh" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                  <AreaChart/>
                  </div>
               <span className="flex-1 ms-3 whitespace-nowrap">LugarH</span>
            </a>
         </li>
         <li>
            <a href="/rh" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                  <BarChartBig/>
                  </div>

               <span className="flex-1 ms-3 whitespace-nowrap">RH</span>
            </a>
         </li>
         <li>
            <a href="/tbr" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                  <PieChart/>
                  </div>

               <span className="flex-1 ms-3 whitespace-nowrap">Trabalha Brasil</span>
            </a>
         </li>
         <li>
            <a href="/user" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                  <User/>
                  </div>

               <span className="flex-1 ms-3 whitespace-nowrap">User</span>
            </a>
         </li>
      </ul>
   </div>
</aside>
<div className="p-4 sm:ml-64 ">
   <div className="p-4 rounded-lg  mt-14">
   <section className="bg-white dark:bg-slate-950">
  <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl text-purple-700 md:text-4xl font-extrabold">73M+</dt>
              <dd className="font-light text-purple-500  dark:text-purple-500">developers</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl text-purple-700 md:text-4xl font-extrabold">1M+</dt>
              <dd className="font-light text-purple-500 dark:text-purple-500">contribuições</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl text-purple-700 md:text-4xl font-extrabold">4M+</dt>
              <dd className="font-light text-purple-500 dark:text-purple-500">organizações</dd>
          </div>
      </dl>
  </div>
</section>
      <div className="grid grid-cols-2  ">
      {isModalOpen1 ? (
  <div className="flex items-center grow  justify-center rounded mt-8">
    <BarChart/>
  </div>
) : null}

{isModalOpen2 ? (
  <div className="flex items-center grow justify-center rounded mt-8">
    <LineGraph/>
  </div>
) : null}

{isModalOpen3 ? (
  <div className="flex items-center grow justify-center rounded mt-8 ">
    <PieGraph/>
  </div>
) : null}

{isModalOpen2 ? (
  <div className="flex items-center grow justify-center rounded mt-8">
    <AreaCharts/>
  </div>
) : null}

{isModalOpen3 ? (
  <div className="flex items-center grow justify-center rounded mt-8">
    <RadialBart/>
  </div>
) : null}

{isModalOpen3 ? (
  <div className="flex items-center grow justify-center rounded mt-8">
    <Piepadding/>
  </div>
) : null}

         </div>
      </div>
   </div>
</div>
</>            


    )
}