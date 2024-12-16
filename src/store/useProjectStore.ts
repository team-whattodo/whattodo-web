import { create } from "zustand";
import { ProjectState } from "@/types/zustand/projectState";
import { ProjectDetail } from "@/types/project/projectDetail";

export const useProjectStore = create<ProjectState>((set) => ({
  project: null,
  setProject: (project: ProjectDetail) => set({ project }),
}));
