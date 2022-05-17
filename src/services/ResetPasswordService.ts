import api from './api';

interface INewPasswordDTO {
  token: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

interface IResetDTO {
  email: string;
}

interface ICodigoDTO {
  token: string;
}

let code: string;

class ResetPasswordService {
  static async sendEmailResetPassword(email: IResetDTO): Promise<any> {
    const { statusText } = await api.post('/resetar-senha/enviar-email', email);
    return statusText;
  }

  static async checkCode(token: ICodigoDTO): Promise<any> {
    code = token.token;
    const { statusText } = await api.post(
      '/resetar-senha/confirmar-codigo',
      code,
    );
    return statusText;
  }

  static resetPassword(data: INewPasswordDTO): Promise<any> {
    data.token = code;
    return api.post('/resetar-senha/nova-senha', data);
  }
}

export default ResetPasswordService;
