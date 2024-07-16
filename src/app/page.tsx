'use client'
import { BarChart } from "./components/components/barchartlogin";
import { Eye, EyeOff } from "lucide-react";
import Logo from "./images/logo.png";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/toggle";
import { UsuarioService } from "../../service/UsuarioService";
import { useRouter } from "next/navigation";

const usuarioService = new UsuarioService();

function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const credentials = { 
      email: email,
      senha: senha 
    };

    usuarioService.login(credentials)
    .then(response => {
      const token = response.data.token; 
      localStorage.setItem('token', token);
      router.push('/bne');
    })
      .catch(error => {
        setError("Erro ao fazer login");
      });
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <img src={Logo.src} width={280} className="px-8 pt-4" alt="logo" />
        <div className="pr-8 pt-8">
          <ModeToggle />
        </div>
      </div>
      <main className="font-mono flex flex-row justify-around mr-24" id="modal-body">
        <div className="mt-24 grow ml-32">
          <BarChart />
        </div>
        <div className="mt-36 mr-36" id="modal-login">
          <div className="">
            <div className="mx-auto text-center">
              <h1 className="text-2xl font-bold sm:text-3xl dark:text-white">Bem Vindo!</h1>
              <p className="mt-4 text-gray-600 dark:text-slate-400">Faça seu login!</p>
            </div>
            <div>
              {error && (
                <div className="bg-red-100 border border-red-400 mt-4 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Erro:</strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
            </div>
            <form className="mx-auto mb-0 mt-4 max-w-md space-y-4" onSubmit={handleLogin}>
              <div>
                <div className="relative">
                  <label className="block text-purple-500 font-semibold text-sm m-2">Email</label>
                  <input
                    placeholder="exemplo@exemplo.com"
                    className="rounded-lg border-gray-300 p-4 min-w-64 w-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800"
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div className="relative">
                  <label className="block text-purple-500 font-semibold text-sm m-2">Senha</label>
                  <input
                    placeholder="***********"
                    className="rounded-lg border-gray-300 p-4 w-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:text-white dark:bg-gray-800"
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)}
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 pt-6"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
              <a href="cadastro"><p className="underline text-sm text-gray-600 dark:text-white">Não tem conta?</p></a>
                <button className="inline-block rounded-lg bg-purple-500 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
