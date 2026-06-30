export type TodoStatus = 'pending' | 'completed';

/** Mirror Prisma model `Todo` */
export interface ITodo {
  id: string;
  text: string;
  status: TodoStatus;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Todo = Pick<ITodo, 'id' | 'text' | 'status'> & {
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TodoQuery = {
  status?: TodoStatus;
  date?: 'today';
};

export type PickCreateTodo = Pick<ITodo, 'text'> & {
  dueDate?: string;
};

export type PickUpdateTodo = Partial<Pick<ITodo, 'text' | 'status'>> & {
  dueDate?: string | null;
};

export type TodoParams = Pick<ITodo, 'id'>;
