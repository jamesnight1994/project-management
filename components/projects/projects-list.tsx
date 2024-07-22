"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@clerk/clerk-react";
import { useStrictModeDroppable } from "@/hooks/use-strictmode-droppable";
import { useIsAuthenticated } from "@/hooks/use-is-authed";
import { EmtpyProject } from "./project-empty";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import moment from "moment";
import { useProjects } from "@/hooks/query-hooks/use-projects";


const ProjectList: React.FC = () => {
  const { projects, projectsLoading } = useProjects();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [droppableEnabled] = useStrictModeDroppable();
  const [isAuthenticated, openAuthModal] = useIsAuthenticated();

  if (!droppableEnabled) {
    return <div></div>;
  }


  let isCreating = false;
  function handleCreateProject({
    name,
  }: {
    name: string;
  }) {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    if (!name) {
      return;
    }

    function createProject(args: { name: string }) {
      isCreating = true;
      console.log("Creating project", args.name);
      setTimeout(() => {
        isCreating = false;
        console.log("Project created");
      }, 1000);
    }
    // createProject(
    //   {
    //     name,
    //     parentId: null,
    //     sprintId,
    //     reporterId: user?.id ?? null,
    //   },
    //   {
    //     onSuccess: () => {
    //       setIsEditing(false);
    //     },
    //   }
    // );
  }


  if (projectsLoading) return <>FETCHING PROJECTS...</>
  return (
    <>
      <div className="w-full flex-col flex">
        <Button
          onClick={() => setIsEditing(true)}
          data-state={isEditing ? "closed" : "open"}
          customColors
          className="my-1 flex w-full bg-transparent hover:bg-gray-200 [&[data-state=closed]]:hidden"
        >
          <AiOutlinePlus className="text-sm" />
          <span className="text-sm">Create Project</span>
        </Button>

        <EmtpyProject
          data-state={isEditing ? "open" : "closed"}
          className="[&[data-state=closed]]:hidden"
          onCreate={({ name }) => handleCreateProject({ name, })}
          onCancel={() => setIsEditing(false)}
          isCreating={isCreating}
        />
        <div className="border-[.05rem] rounded-sm mt-2">
          <TableWrapper projects={projects??[]} />
        </div>
      </div>
    </>
  );
};

const TableWrapper = ({ projects }: { projects: any[] }) => (
  <Table>
    {/* <TableCaption>A list of your projects</TableCaption> */}
    <TableHeader>
      <TableRow>
        <TableHead>Project Name</TableHead>
        <TableHead>Start Date</TableHead>
        <TableHead>End Date</TableHead>
        <TableHead className="w-[100px]">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {projects.map((aProject: any, idx: number) => (
        <TableRow key={idx}>
          <TableCell className="font-medium">{aProject.name}</TableCell>
          <TableCell>{moment(aProject.startDate).format('MMM Do, YYYY')}</TableCell>
          <TableCell>{moment(aProject.endDate).format('MMM Do, YYYY')}</TableCell>
          <TableCell className="text-left">
            <Badge
              variant={aProject.status === 'Completed' ? "default" : "destructive"}
              className={`${aProject.status === 'Completed'
                ? "bg-green-600"
                : aProject.status === 'In Progress'
                  ? "bg-amber-600"
                  : "bg-primary"
                }
                  whitespace-nowrap`}
            >{aProject.status}</Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export { ProjectList };
