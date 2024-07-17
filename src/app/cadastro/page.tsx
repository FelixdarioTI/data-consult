'use client'
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import Logo from "../images/logo.png";
import { ModeToggle } from "@/components/toggle";
import { LineGraph } from "../components/components/linegraphlogin";
import { UsuarioService } from "../../../service/UsuarioService";
import { useRouter } from 'next/navigation';

const usuarioService = new UsuarioService();

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCadastro = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data_Cadastro = new Date().toISOString();

    const credentialsCadastro = {
      nome,
      email,
      senha,
      role,
      data_Cadastro
    };

    console.log("Enviando dados de cadastro:", credentialsCadastro); 

    usuarioService.Cadastro(credentialsCadastro)
      .then((response) => {
        setSuccessMessage("Usuário cadastrado com sucesso.");
        setError("");
        setTimeout(() => {
          router.push('/');
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro: Este email já tem uma conta", error.response ? error.response.data : error.message);
        setSuccessMessage("");
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Erro: Este email já tem uma conta");
        }
      });
  };

  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between">
          <img src={Logo.src} width={280} className="px-8 pt-4" alt="logo" />
        </div>
        <main className="font-mono flex flex-row justify-center mr-24" id="modal-body">
          <div className="mt-24 grow ml-32">
            <LineGraph />
          </div>
          <div className="z-10 mt-12 mr-36 -top-1/2 items-stretch">
            <div className="">
              <div className="mx-auto text-center">
                <h1 className="text-2xl font-bold sm:text-3xl dark:text-white">Bem Vindo!</h1>
                <p className="mt-4 text-gray-600 dark:text-slate-400">Faça seu cadastro!</p>
              </div>
              <form className="mx-auto mb-0 mt-8 space-y-4" onSubmit={handleCadastro}>
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
                <div>
                  <label className="block text-purple-500 font-semibold text-sm m-2">Nome</label>
                  <div className="relative">
                    <input placeholder="Nome e Sobrenome" className="rounded-lg border-gray-300 p-4 min-w-64 w-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800" id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                  </div>
                  <label className="block text-purple-500 font-semibold text-sm m-2">Email</label>
                  <div className="relative">
                    <input placeholder="exemplo@exemplo.com" className="rounded-lg border-gray-300 p-4 min-w-64 w-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800" id="emailCadastro" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <label className="block text-purple-500 font-semibold text-sm m-2">Função</label>
                  <div className="relative">
                    <input className="rounded-lg border-gray-300 p-4 min-w-64 w-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800" id="role" type="text" placeholder="Função..." value={role} onChange={(e) => setRole(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-purple-500 font-semibold text-sm m-2">Senha</label>
                    <div className="relative">
                      <input
                        placeholder="***********"
                        className="rounded-lg border-gray-300 p-4 min-w-64 w-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800"
                        id="passwordCadastro"
                        type={showPassword ? "text" : "password"}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-4"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <a href="/"><p className="underline text-sm text-gray-600 dark:text-white">Já tem conta?</p></a>
                  <button className="inline-block rounded-lg bg-purple-500 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">Cadastro</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Cadastro;
