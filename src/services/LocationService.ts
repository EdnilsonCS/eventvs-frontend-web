import axios from 'axios';
import cep from 'cep-promise';

export interface IState {
  id: string;
  nome: string;
  sigla: string;
}

export interface ICity {
  id: string;
  nome: string;
}

export interface ICepInformations {
  cep?: string;
  state?: string;
  city?: string;
  street?: string;
  neighborhood?: string;
}

class EventService {
  static async getStateList(): Promise<IState[]> {
    const { data } = await axios.get<IState[]>(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
    );

    return data;
  }

  static async getCityList({ UF }: { UF: string }): Promise<ICity[]> {
    const { data } = await axios.get<ICity[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`,
    );

    return data;
  }

  static async getInformationByCep({
    cepNumber,
  }: {
    cepNumber: string;
  }): Promise<ICepInformations> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          cep(cepNumber).then((dados: ICepInformations) => {
            resolve(dados);
          });
        } catch (err) {
          reject(err);
        }
      })();
    });
  }
}

export default EventService;
