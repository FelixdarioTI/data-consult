import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://testing-api.dataconsult.bne.com.br/api",
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class UsuarioService {
  login(credentials: { email: string; senha: string; }) {
    return axiosInstance.post("/User/Login", credentials);
  }

  Cadastro(credentialsCadastro: { nome: string; email: string; senha: string; role?: string; data_Cadastro?: string; }) {
    return axiosInstance.post("/User/Cadastro", credentialsCadastro);
  }

  Atualizar(id: number, credentialsAtualizar: { nome: string; email: string; senha?: string; role?: string; data_Cadastro?: string; }) {
    return axiosInstance.put(`/User/Atualizar?id=${id}`, credentialsAtualizar);
  }

  Excluir(id: number) {
    return axiosInstance.delete(`/User/Excluir?id=${id}`);
  }

  buscarUsuarioPorId(id: number) {
    return axiosInstance.get(`/User/BuscarPorId?id=${id}`);
  }
}
