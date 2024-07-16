'use client'
import Logo from "../images/logo.png";
import UserPerfil from "../images/perfil-teste.jpg"
import { BarChart3, PieChart, AreaChart, BarChartBig, User } from "lucide-react"
import React, { useState, useEffect } from 'react';
import { ModeToggle } from "@/components/toggle";
import { useRouter } from "next/navigation";
import { UsuarioService } from "../../../service/UsuarioService";

const usuarioService = new UsuarioService();

export default function Menu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 1000); 
    } else {
      router.push('/');
    }
  }, [router]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ nome: "", email: "", senha: "", role: "" });

  const handleUpdate = () => {
    usuarioService.Atualizar(editData)
      .then(response => {
        console.log("Atualizado com sucesso");
        setIsEditModalOpen(false);
      })
      .catch(error => {
        console.error("Erro ao atualizar:", error);
      });
  };

  const handleDelete = () => {
    usuarioService.Excluir()
      .then(response => {
        console.log("Excluído com sucesso");
        setIsModalOpen(false);
        localStorage.removeItem('token');
        router.push('/');
      })
      .catch(error => {
        console.error("Erro ao excluir:", error);
      });
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

  return (
    <>
      <div className="">
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-950 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <a href="/bne" className="flex ms-2 md:me-24">
                  <img src={Logo.src} className="h-16 me-3" alt="Logo" />
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div className="pr-8"> 
                    <ModeToggle />
                  </div>
                  <div>
                    <a href="/user">
                      <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                        <span className="sr-only">Menu</span>
                        <img className="w-8 h-8 rounded-full" src={UserPerfil.src} alt="user photo" />
                      </button>
                    </a>
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
                    <BarChart3 />
                  </div>
                  <span className="ms-3">Bne</span>
                </a>
              </li>
              <li>
                <a href="/lugarh" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                    <AreaChart />
                  </div>
                  <span className="flex-1 ms-3 whitespace-nowrap">LugarH</span>
                </a>
              </li>
              <li>
                <a href="/rh" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                    <BarChartBig />
                  </div>
                  <span className="flex-1 ms-3 whitespace-nowrap">RH</span>
                </a>
              </li>
              <li>
                <a href="/tbr" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                    <PieChart />
                  </div>
                  <span className="flex-1 ms-3 whitespace-nowrap">Trabalha Brasil</span>
                </a>
              </li>
              <li>
                <a href="/user" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <div className="text-purple-500 transition duration-75 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                    <User />
                  </div>
                  <span className="flex-1 ms-3 whitespace-nowrap">User</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className="p-4 sm:ml-64 dark:bg-slate-950 ">
          <div className="p-4 rounded-lg  mt-14">
            <div className="">
              <div className="flex justify-around mt-4 dark:bg-slate-950 ">
                <div className="grid grid-cols-1 flex justify-start mr-36">
                  <button className="grid content-center justify-items-center w-40 h-16 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-opacity-50" id="editButton" onClick={() => setIsEditModalOpen(true)} type="submit">Editar Perfil</button>
                  <button id="deleteButton" type="button" onClick={() => setIsModalOpen(true)} className="grid content-center justify-items-center w-40 h-16 rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-opacity-50" >Excluir Perfil</button>
                </div>
                <span className="grid content-center ml-36 justify-items-center"><h1 className="text-3xl dark:text-white">Eduardo Felix</h1></span>
                <img className="w-36 rounded-full mr-36" src={UserPerfil.src} alt="user photo"/>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalOpen(false)}>
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">Você realmente deseja excluir está conta?</p>
                <div className="flex justify-center items-center space-x-4">
                  <button type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setIsModalOpen(false)}>
                    Não, cancele
                  </button>
                  <button type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={handleDelete}>
                    Sim, tenho certeza
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isEditModalOpen && (
          <div id="editModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsEditModalOpen(false)}>
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z" />
                </svg>

                <p className="mb-4 text-gray-500 dark:text-gray-300">Você realmente deseja editar está conta?</p>
                <div>
                  <label className="flex justify-start items-start pl-16 block text-purple-500 font-semibold text-sm m-2">Nome</label>
                  <div className="relative">
                    <input placeholder="Nome e Sobrenome" className="rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800" value={editData.nome} onChange={(e) => setEditData({ ...editData, nome: e.target.value })} type="text" />
                  </div>
                  <label className="flex justify-start items-start pl-16 block text-purple-500 font-semibold text-sm m-2">Email</label>
                  <div className="relative">
                    <input placeholder="exemplo@exemplo.com" className="rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} type="email" />
                  </div>
                  <label className="flex justify-start items-start pl-16 block text-purple-500 font-semibold text-sm m-2">Função</label>
                  <div className="relative">
                    <input className="rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800" value={editData.role} onChange={(e) => setEditData({ ...editData, role: e.target.value })} placeholder="Função..."  type="text" />
                  </div>
                  <label className="flex justify-start items-start pl-16 block text-purple-500 font-semibold text-sm m-2">Senha</label>
                  <div className="relative">
                    <input placeholder="***********" className="rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800" value={editData.senha} onChange={(e) => setEditData({ ...editData, senha: e.target.value })} type="password" />
                  </div>
                </div>

                <div className="flex justify-center items-center pt-8 space-x-4">
                  <button type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setIsEditModalOpen(false)}>
                    Não, cancele
                  </button>
                  <button type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-900" onClick={handleUpdate}>
                    Sim, tenho certeza
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
