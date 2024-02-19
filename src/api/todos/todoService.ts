import baseApi from '../baseApi';

const todoService = {

  async getAllTodos(): Promise<ServerResponse | any> {
    try {
      const response = await baseApi.get('/todos');
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async createTodo(todoData: Todo): Promise<Todo | any> {
    try {
      const response = await baseApi.post<Todo>('/todos/create-todo', todoData);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async updateTodo(id: string, updatedTodo: TodoUpdate): Promise<Todo | any> {
    try {
      const response = await baseApi.put<Todo>(`/todos/${id}`, updatedTodo);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async deleteTodo(id: string | number): Promise<any> {
    try {
      return await baseApi.delete(`/todos/${id}`);
    } catch (error) {
      return error;
    }
  },
};

export default todoService;
