import { Task } from "../task/task";

export interface Wbs {
  id: string;
  title: string;
  detail: string;
  task: Task[];
}