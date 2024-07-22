"use client";
import { toast } from "@/components/toast";
import { useSelectedProjectContext } from "@/context/use-selected-project-context";
import { api } from "@/utils/api";
import { type ProjectType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { TOO_MANY_REQUESTS } from ".";

const useDeleteProject = () => {
  const { projectKey, setProjectKey } = useSelectedProjectContext();

  const queryClient = useQueryClient();

  const { mutate: deleteProject, isLoading: isDeleting } = useMutation(
    api.project.deleteProject,
    {
      // OPTIMISTIC UPDATE
      onMutate: async (deletedProject) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ["projects"] });
        // Snapshot the previous value
        const previousProjects = queryClient.getQueryData(["projects"]);
        // Optimistically delete the project
        queryClient.setQueryData(["projects"], (old: ProjectType[] | undefined) => {
          return old?.filter((project) => project.id !== deletedProject.projectId);
        });
        // Return a context object with the snapshotted value
        return { previousProjects };
      },
      onError: (err: AxiosError, deletedProject, context) => {
        // If the mutation fails, use the context returned from onMutate to roll back
        if (err?.response?.data == "Too many requests") {
          toast.error(TOO_MANY_REQUESTS);
          return;
        }
        toast.error({
          message: `Something went wrong while deleting the project ${deletedProject.projectId}`,
          description: "Please try again later.",
        });
        queryClient.setQueryData(["projects"], context?.previousProjects);
      },
      onSettled: (deletedProject) => {
        // Always refetch after error or success
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.invalidateQueries(["projects"]);

        // Unselect the deleted project if it is currently selected
        if (projectKey == deletedProject?.key) {
          setProjectKey(null);
        }
      },
    }
  );
  return { deleteProject, isDeleting };
};

export { useDeleteProject };
