import { Sprint } from "../sprint/sprint";
import { User } from "../user/user";
import { Wbs } from "../wbs/wbs";
import { Project } from "./project";

export interface ProjectDetail extends Project {
  members: User[];
  sprint: Sprint | null;
  wbs: Wbs | null;
}