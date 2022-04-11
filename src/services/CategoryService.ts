import api from './api';

export interface ICategoryCreateDTO {
  nome: string;
  descricao: string;
}

export interface ICategory {
  id: number;
  nome: string;
  descricao: string;
}

class CategoryService {
  static async createNewCategory(
    category: ICategoryCreateDTO,
  ): Promise<ICategory> {
    const { data } = await api.post<ICategory>('/categorias', category);

    return data;
  }

  static async getCategoryList(): Promise<ICategory[]> {
    const { data } = await api.get<ICategory[]>('/categorias');

    return data;
  }
}

export default CategoryService;
