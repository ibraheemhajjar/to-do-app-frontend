import baseApi from '../baseApi';

const authService = {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await baseApi.post<ServerResponse>('/auth/signin', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return error; 
    }
  },

  async register(email: string,password: string, confirmPassword: string): Promise<any> {
    try {
      const response = await baseApi.post<ServerResponse>('/auth/signup', {
        email,
        password,
        confirmPassword
      });
      return response.data;
    } catch (error) {
      return error
    }
  },
};

export default authService;
