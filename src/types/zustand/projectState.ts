import { ProjectDetail } from "../project/projectDetail";

export interface ProjectState {
  project: ProjectDetail | null;
  setProject: (project: ProjectDetail) => void;
}