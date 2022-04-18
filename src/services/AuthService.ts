import qs from 'qs';
import api from './api';

interface ILoginDTO {
  email: string;
  password: string;
}

interface ISignupDTO {
  cpf: string;
  nome: string;
  senha: string;
  email: string;
}

const authHeader = 'Basic YXBwLW1vYmlsZTptb2JpbGU=';
class AuthService {
  static async signIn(data: ILoginDTO): Promise<any> {
    const result = await api.post(
      '/oauth/token',
      qs.stringify({
        username: data.email, // gave the values directly for testing
        password: data.password,
        grant_type: 'password',
      }),
      {
        headers: {
          authorization: 'Basic YXBwLW1vYmlsZTptb2JpbGU=',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    return result;
  }

  static signUp(data: ISignupDTO): Promise<any> {
    return api.post('/criar/participantes', data);
  }

  static signUpProducer(data: ISignupDTO): Promise<any> {
    return api.post('/criar/produtores', data);
  }

  static getNewToken(token: string): Promise<any> {
    return api({
      method: 'post',
      url: '/oauth/token',

      data: qs.stringify({
        refresh_token: token,
        grant_type: 'refresh_token',
      }),
      headers: {
        Authorization: authHeader,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  }
}

export default AuthService;
