import { Project } from "../project/project";

export interface User {
  id: number;
  email: string;
  nickname: string;
  username: string;
  role: string;
  projects: Project[];
}