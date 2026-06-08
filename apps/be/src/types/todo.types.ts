export type TodoStatus = 'pending' | 'completed';

export interface TodoParams {
  id: string;
}

export interface TodoQuery {
  status?: TodoStatus;
  date?: 'today';
}

export interface CreateTodoBody {
  text: string;
  dueDate?: string;
}

export interface UpdateTodoBody {
  text?: string;
  status?: TodoStatus;
  dueDate?: string | null;
}
