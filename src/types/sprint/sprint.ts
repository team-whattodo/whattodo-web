import { Task } from "../task/task";

export interface Sprint {
  id: string;
  title: string;
  detail: string;
  start: string;
  deadline: string;
  task: Task[];
}