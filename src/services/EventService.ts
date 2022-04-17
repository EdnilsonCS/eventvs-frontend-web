import api from './api';

export interface IEvent {
  id: number;
  categoria: {
    id: number;
    nome: string;
    descricao: string;
  };
  dataHoraFim: Date;
  dataHoraInicio: Date;
  descricao: string;
  endereco: {
    id: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  nome: string;
  statusEvento: string;
}

export interface IEventCreateDTO {
  categoriaId: string;
  dataHoraFim: string;
  dataHoraInicio: string;
  descricao: string;
  endereco: {
    logradouro: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: number;
  };
  nome: string;
  statusEvento: string;
}

class EventService {
  static async createNewEvent(event: IEventCreateDTO): Promise<IEvent> {
    const { data } = await api.post<IEvent>('/eventos', event);

    return data;
  }

  static async editEvent({
    event,
    id,
  }: {
    event: IEventCreateDTO;
    id: string;
  }): Promise<IEvent> {
    const { data } = await api.patch<IEvent>(`/eventos/${id}`, event);

    return data;
  }

  static async getNotSubscribeEvents(): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>('/eventos/publicados_filtro');

    return data;
  }

  static async getEvents(): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>('/eventos/publicados');

    return data;
  }

  static async getEventsPublicadoByCategoria(
    idCategoria: string,
  ): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>(
      `eventos/publicados/categoria/${idCategoria}`,
    );

    return data;
  }

  static async getEventsPublicadoByDate({
    StartDate,
    EndDate,
  }: {
    StartDate: Date;
    EndDate: Date;
  }): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>(`eventos/publicados/entre-datas`, {
      params: {
        dataHoraInicio: StartDate,
        dataHoraFim: EndDate,
      },
    });

    return data;
  }

  static async getEventsNaoPublicado(): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>(`eventos/nao-publicados`);

    return data;
  }

  static async getEventsNaoPublicadoByCategoria(
    idCategoria: string,
  ): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>(
      `eventos/nao-publicados/categoria/${idCategoria}`,
    );

    return data;
  }

  static async getEventsNaoPublicadoByDate({
    StartDate,
    EndDate,
  }: {
    StartDate: Date;
    EndDate: Date;
  }): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>(
      `eventos/nao-publicados/entre-datas`,
      {
        params: {
          dataHoraInicio: StartDate,
          dataHoraFim: EndDate,
        },
      },
    );

    return data;
  }

  static async getEventDetail(id: string): Promise<IEvent> {
    const { data } = await api.get<IEvent>(`/eventos/${id}`);

    return data;
  }

  static async publicEvent(id: string): Promise<void> {
    await api.patch<IEvent>(`/eventos/${id}/publicar`);
  }

  static async deleteEvent(id: string): Promise<void> {
    await api.delete<IEvent>(`/eventos/${id}`);
  }

  static async cancelEvent(id: string): Promise<void> {
    await api.patch<IEvent>(`/eventos/${id}/cancelar`);
  }
}

export default EventService;
