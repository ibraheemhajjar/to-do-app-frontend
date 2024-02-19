interface ServerResponse {
  executedSuccessfully?: boolean,
  statusCode?: number,
  data?: any,
  error?: any,
}

interface UserState {
  accessToken: string | null;
  isLoggedIn: boolean;
  todos: Todo[];
}

interface RootState {
  user: UserState;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

interface Todo {
  id?: string | number;
  title: string;
  description: string;
  isDone?: boolean;
}

interface TodoUpdate {
  id?: string | number;
  title?: string;
  description?: string;
  isDone: boolean;
}

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: Todo) => void;
  todoToEdit?: Todo; // For editing mode
}
