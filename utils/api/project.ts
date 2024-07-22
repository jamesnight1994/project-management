import { type GetProjectResponse } from "@/app/api/project/route";
import axios from "axios";
import { getBaseUrl } from "../helpers";
import { type GetProjectMembersResponse } from "@/app/api/project/[project_id]/members/route";
import { GetProjectsResponse } from "@/app/api/projects/route";

const baseUrl = getBaseUrl();

export const projectRoutes = {
  getProjects: async ({ signal }: { signal?: AbortSignal }) => {
    const { data } = await axios.get<GetProjectsResponse>(
      `${baseUrl}/api/projects`,
      { signal }
    );
    return data?.projects;
  },

  postProject: async () => {
    throw new Error('Not Implemented')
  },

  deleteProject: async () => {
    throw new Error('Not Implemented')
  },

  updateBatchProjects: async (body: any) => {
    throw new Error('Not Implemented');
  },
  
  patchProject: async (body: any) => {
    throw new Error('Not Implemented');
  },

  getProject: async () => {
    const { data } = await axios.get<GetProjectResponse>(
      `${baseUrl}/api/project`
    );
    return data?.project;
  },
  getMembers: async ({ project_id }: { project_id: string }) => {
    const { data } = await axios.get<GetProjectMembersResponse>(
      `${baseUrl}/api/project/${project_id}/members`
    );
    return data?.members;
  },
};
