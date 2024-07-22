"use client";
import { toast } from "@/components/toast";
import { api } from "@/utils/api";
import { type ProjectType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { TOO_MANY_REQUESTS } from ".";

const useUpdateProjectsBatch = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProjectsBatch, isLoading: batchUpdating } = useMutation(
    api.project.updateBatchProjects,
    {
      // OPTIMISTIC UPDATE
      onMutate: async (newProject) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["projects"]);
        // Snapshot the previous value
        const previousProjects = queryClient.getQueryData<ProjectType[]>([
          "projects",
        ]);

        // Optimistically updating the projects
        queryClient.setQueryData(["projects"], (old?: ProjectType[]) => {
          const newProjects = (old ?? []).map((project) => {
            const { ids, ...updatedProps } = newProject;
            if (ids.includes(project.id)) {
              // Assign the new prop values to the project
              return Object.assign(project, updatedProps);
            }
            return project;
          });
          return newProjects;
        });

        // Return a context object with the snapshotted value
        return { previousProjects };
      },
      onError: (err: AxiosError, newProject, context) => {
        // If the mutation fails, use the context returned from onMutate to roll back
        queryClient.setQueryData(["projects"], context?.previousProjects);

        if (err?.response?.data == "Too many requests") {
          toast.error(TOO_MANY_REQUESTS);
          return;
        }
        toast.error({
          message: `Something went wrong while batch updating projects`,
          description: "Please try again later.",
        });
      },
      onSettled: () => {
        // Always refetch after error or success
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );
  return { updateProjectsBatch, batchUpdating };
};

export { useUpdateProjectsBatch };
