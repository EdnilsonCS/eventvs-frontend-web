import api from './api';

export interface IApplicants {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  situacao: string;
}

class AdministratorService {
  static async getApplicants(): Promise<IApplicants[]> {
    const { data } = await api.get<IApplicants[]>('/produtores/solicitados');

    return data;
  }

  static async getAccept(id: number): Promise<void> {
    await api.get(`/produtores/${id}/aceitar`);
  }

  static async getDeny(id: number): Promise<void> {
    await api.get(`/produtores/${id}/recusar`);
  }
}

export default AdministratorService;
