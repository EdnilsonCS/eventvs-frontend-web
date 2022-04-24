import api from './api';

export interface IData {
  nome: string;
  novaSenha: string;
}

class CommonServices {
  static async updateData(data: IData): Promise<Partial<IData>> {
    const { data: dados } = await api.patch<IData>('/pessoas', {
      senha: data.novaSenha,
      nome: data.nome,
    });

    return dados;
  }
}

export default CommonServices;
