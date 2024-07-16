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

  Atualizar(credentialsAtualizar: { nome: string; email: string; senha: string; role?: string; data_Cadastro?: string; }) {
    return axiosInstance.put("/User/Atualizar", credentialsAtualizar);
  }

  Excluir() {
    return axiosInstance.delete("/User/Excluir");
  }


  buscarUsuarioPorId(id: number) {
    return axiosInstance.get(`/User/BuscarPorId?id=${id}`);
  }
}
