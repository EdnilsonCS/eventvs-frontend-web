import api from './api';
import { IEvent } from './EventService';

export interface IParticipantes {
  id: number;
  dataHora: Date;
  isCancelada: false;
  participante: {
    id: number;
    pessoa: {
      nome: string;
    };
  };
  evento: IEvent;
}

class ParticipantsService {
  static async getParticipantsByEventId(id: string): Promise<IParticipantes[]> {
    const { data } = await api.get<IParticipantes[]>(
      `/inscricoes/eventos/${id}`,
    );

    return data;
  }
}

export default ParticipantsService;
