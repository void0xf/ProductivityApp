export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  list: string;
  completed: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface List {
  name: string;
  color: string;
  icon: string;
}

export interface TasksState {
  tasks: Task[];
  lists: List[];
  loading: boolean;
  error: string | null;
}
