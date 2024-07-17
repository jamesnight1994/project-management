"use client";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { type ProjectType } from "@/utils/types";
import clsx from "clsx";
import { useUser } from "@clerk/clerk-react";
import { useStrictModeDroppable } from "@/hooks/use-strictmode-droppable";
import { useIsAuthenticated } from "@/hooks/use-is-authed";
import { EmtpyProject } from "./project-empty";


const projects: ProjectType[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'A complete redesign of the corporate website to improve UX and SEO.',
    startDate: new Date('2023-01-15'),
    endDate: new Date('2023-06-30'),
    status: 'Completed',
    teamMembers: ['Alice', 'Bob', 'Charlie'],
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Developing a cross-platform mobile app for customer engagement.',
    startDate: new Date('2023-03-01'),
    endDate: new Date('2023-09-01'),
    status: 'In Progress',
    teamMembers: ['Dave', 'Eva', 'Frank'],
  },
  {
    id: 3,
    name: 'Cloud Migration',
    description: 'Migrating existing infrastructure to a cloud-based solution.',
    startDate: new Date('2023-04-15'),
    endDate: new Date('2023-12-31'),
    status: 'In Progress',
    teamMembers: ['George', 'Hannah', 'Ian'],
  },
  {
    id: 4,
    name: 'Marketing Campaign',
    description: 'Launching a new marketing campaign to promote the latest product.',
    startDate: new Date('2023-05-01'),
    endDate: new Date('2023-10-15'),
    status: 'Not Started',
    teamMembers: ['Jack', 'Karen', 'Leo'],
  },
  {
    id: 5,
    name: 'Data Analysis Project',
    description: 'Analyzing customer data to identify trends and improve services.',
    startDate: new Date('2023-02-01'),
    endDate: new Date('2023-07-15'),
    status: 'Completed',
    teamMembers: ['Mia', 'Nathan', 'Olivia'],
  },
];

const ProjectList: React.FC= () => {
  // const { createProject, isCreating } = useProjects();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [droppableEnabled] = useStrictModeDroppable();
  const [isAuthenticated, openAuthModal] = useIsAuthenticated();

  if (!droppableEnabled) {
    return null;
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

    function createProject(args:{name: string}){
      isCreating = true;
      console.log("Creating project",args.name);
      setTimeout(() => {
        isCreating = false;
        console.log("Project created");
      },1000);
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
  return (
    <AccordionContent className="pt-2">
      <Droppable droppableId={"projects"}>
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            {...droppableProps}
            ref={innerRef}
            className={clsx(projects.length == 0 && "min-h-[1px]")}
          >
            {placeholder}
          </div>
        )}
      </Droppable>

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
    </AccordionContent>
  );
};

export { ProjectList };
