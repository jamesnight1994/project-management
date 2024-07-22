"use client";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useUpdateProject } from "./use-update-project";
import { useUpdateProjectsBatch } from "./use-update-batch";
import { usePostProject } from "./use-post-project";
import { useDeleteProject } from "./use-delete-project";

export const TOO_MANY_REQUESTS = {
  message: `You have exceeded the number of requests allowed per minute.`,
  description: "Please try again later.",
};

export const useProjects = () => {
  const { data: projects, isLoading: projectsLoading } = useQuery(
    ["projects"],
    ({ signal }) => api.project.getProjects({ signal }),
    {
      refetchOnMount: false,
    }
  );
  
  const { updateProjectsBatch, batchUpdating } = useUpdateProjectsBatch();
  const { updateProject, isUpdating } = useUpdateProject();
  const { createProject, isCreating } = usePostProject();
  const { deleteProject, isDeleting } = useDeleteProject();

  return {
    projects,
    projectsLoading,
    updateProject,
    isUpdating,
    updateProjectsBatch,
    batchUpdating,
    createProject,
    isCreating,
    deleteProject,
    isDeleting,
  };
};
