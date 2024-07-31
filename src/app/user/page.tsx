'use client'
import Logo from "../images/logo.png";
import { BarChart3, PieChart, AreaChart, BarChartBig, User, UserX, BarChart4, BarChartHorizontal, BarChartHorizontalBig, CandlestickChart } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { ModeToggle } from "@/components/toggle";
import { useRouter } from "next/navigation";
import { UsuarioService } from "../../../service/UsuarioService";
import LogoLoader from "../images/logoloader.png";

const usuarioService = new UsuarioService();

export default function Menu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ nome: "", email: "", senha:"", role: "", data_Cadastro: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.id) {
        setUserId(user.id);
        setEditData(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/');
      }
    } else {
      setIsAuthenticated(false);
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId !== null) {
      const data_Cadastro = new Date().toISOString();
      const updatedData = { ...editData, data_Cadastro };
      console.log("Enviando dados de atualização:", updatedData);
      usuarioService.Atualizar(userId, updatedData)
        .then(response => {
          setSuccessMessage("Usuário atualizado com sucesso.");
          setError("");
          // Atualizar os dados armazenados localmente
          localStorage.setItem('user', JSON.stringify(updatedData));
        })
        .catch(error => {
          console.error("Erro ao atualizar:", error);
          setError("Erro ao atualizar usuário.");
          setSuccessMessage("");
        });
    }
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId !== null) {
      usuarioService.Excluir(userId)
        .then(response => {
          console.log("Excluído com sucesso");
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/');
        })
        .catch(error => {
          console.error("Erro ao excluir:", error);
        });
    }
  };

  const [activeSection, setActiveSection] = useState<string>("userEdit");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-28 h-28 border-8 text-purple-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-purple-400 rounded-full">
            <img src={LogoLoader.src} className="w-16 h-16" alt="Logo Loader" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Renderizar nada se não estiver autenticado, pois o redirecionamento já está sendo feito no useEffect
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "userEdit":
        return (
          <form onSubmit={handleUpdate} className="p-4 col-span-6 md:col-span-4">
            {error && (
              <div className="bg-red-100 border border-red-400 mt-4 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erro:</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 border mt-4 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
            <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Nome</label>
                <div className="mt-2">
                  <input 
                    type="text" 
                    name="nome" 
                    id="nome"  
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800"
                    value={editData.nome}
                    onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Função</label>
                <div className="mt-2">
                  <input 
                    type="text" 
                    name="role" 
                    id="role"  
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800"
                    value={editData.role}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Email</label>
                <div className="mt-2">
                  <input 
                    id="email" 
                    name="email" 
                    type="email"  
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="submit" className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm">Salvar</button>
            </div>
          </form>
        );
      case "passwordEdit":
        return (
          <form onSubmit={handleUpdate} className="p-4 col-span-6 md:col-span-4">
            <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
              <div className="col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Senha</label>
                <div className="mt-2">
                  <input 
                    id="senha" 
                    name="senha" 
                    type="password"  
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800"
                    value={editData.senha}
                    onChange={(e) => setEditData({ ...editData, senha: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Confirme a senha</label>
                <div className="mt-2">
                  <input 
                    id="confirmeSenha" 
                    name="confirmeSenha" 
                    type="password"  
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="submit" className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm">Salvar</button>
            </div>
          </form>
        );
      case "configEdit":
        return (
          <div className="max-w-md mx-auto bg-white rounded-md dark:bg-slate-950">
            <form onSubmit={handleDelete} action="#" method="POST">
              <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-2 dark:text-gray-300">Seu Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={editData.nome}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 text-sm font-bold mb-2 dark:text-gray-300">Seu Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={editData.email}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800"
                  disabled
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-900 text-sm font-bold mb-2 dark:text-gray-300">Descrição do problema</label>
                <textarea 
                  id="message" 
                  name="message"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple"
              >
                Excluir Perfil
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="">
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-950 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <a href="/bne-cia" className="flex ms-2 md:me-24">
                  <img src={Logo.src} className="h-16 me-3" alt="Logo" />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <aside id="logo-sidebar" className="fixed top-8 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-slate-950 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-slate-950">
      <ul className="space-y-2 font-medium">
         <li>
            <a href="/bne-cia" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                  <BarChart3/>
                  </div>
               <span className="ms-3">Bne - Cia</span>
            </a>
         </li>
         <li>
            <a href="/bne-vip" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
               <BarChart4 />
                  </div>
               <span className="ms-3">Bne - Vip</span>
            </a>
         </li>
         <li>
            <a href="/uemp" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
               <BarChartHorizontalBig />
                  </div>
               <span className="ms-3">Uemp</span>
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
            <a href="/ats" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
               <BarChartHorizontal />
                  </div>
               <span className="ms-3">ATS</span>
            </a>
         </li>
         <li>
            <a href="/floox" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
               <CandlestickChart />
                  </div>
               <span className="ms-3">Floox</span>
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
        <div className="p-4 sm:ml-64 dark:bg-slate-950 ">
          <div className="p-4 rounded-lg  mt-14">
          <div className='bg-white dark:bg-black'>
           
               
        <div className={`flex flex-col items-center justify-start mt-24 min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white`}>
           
            <div className="lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 border-b border-gray-200 pb-12 mx-auto dark:border-gray-800">
                <div className="p-4 col-span-6 md:col-span-2">
                    <div className="grid grid-cols-5">
                        <div className="md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-indigo-50 dark:hover:bg-gray-700">
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-800 dark:group-hover:bg-gray-600 mx-auto md:mx-0">
                                <svg className="mx-auto items-center justify-center h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                </svg>
                            </div>
                            <div className="flex-auto hidden md:block">
                                <a href="#" className="block font-semibold text-gray-900 dark:text-gray-300"onClick={() => setActiveSection("userEdit")}>
                                Informações pessoais
                                    <span className="absolute inset-0"></span>
                                </a>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">Altere aqui suas Informações</p>
                            </div>
                        </div>
                        <div className="md:col-span-5 group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-800 dark:group-hover:bg-gray-600 mx-auto md:mx-0">
                                <svg className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </div>
                            <div className="flex-auto hidden md:block">
                                <a href="#" className="block font-semibold text-gray-900 dark:text-gray-300" onClick={() => setActiveSection("passwordEdit")}>
                                    Senha
                                    <span className="absolute inset-0"></span>
                                </a>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">Altere sua senha</p>
                            </div>
                            </div>
                        <div className="md:col-span-5 group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-800 dark:group-hover:bg-gray-600 mx-auto md:mx-0">
                               <UserX className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600"/>
                            </div>
                            <div className="flex-auto hidden md:block">
                                <a href="#" className="block font-semibold text-gray-900 dark:text-gray-300" onClick={() => setActiveSection("configEdit")}>
                                Integrações
                                    <span className="absolute inset-0"></span>
                                </a>
                                <p className="mt-1 text-gray-600 dark:text-gray-400">Exclua seu perfil</p>
                            </div>
                        </div>
                        <div className='md:col-span-5 group relative flex items-center gap-x-6 p-3 pl-3.5 text-sm leading-6'>
                        <ModeToggle/>
                        </div>
                        </div></div>
                <div className="col-span-6 md:col-span-4">
                    {renderActiveSection()}
                </div>
            </div>
        </div>
        </div>
          </div>
        </div>
      </div>
    </>
  );
}
