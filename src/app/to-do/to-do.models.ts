export interface ToDo {
  id: number;
  title: string;
  status: ToDoStatus;
  createdAt?: Date;
  dueDate?: Date;
  updatedAt?: Date;
}

export type ToDoStatus = 'ToDo' | 'Done' | 'Old';

export const emptyToDo: ToDo = {
  id: -1,
  title: '',
  status: 'ToDo'
};
