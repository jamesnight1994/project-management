"use client";
import React, { Fragment, useLayoutEffect } from "react";
import Split from "react-split";
import { useSelectedIssueContext } from "@/context/use-selected-issue-context";
import "@/styles/split.css";
import { ProjectsHeader } from "./header";
import { ProjectList } from "./projects-list";
import { useProject } from "@/hooks/query-hooks/use-project";

const Projects: React.FC = () => {
  const { project } = useProject();
  const { issueKey, setIssueKey } = useSelectedIssueContext();
  const renderContainerRef = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!renderContainerRef.current) return;
    const calculatedHeight = renderContainerRef.current.offsetTop;
    renderContainerRef.current.style.height = `calc(100vh - ${calculatedHeight}px)`;
  }, []);

  if (!project) return null;

  return (
    <Fragment>
      <ProjectsHeader />
      <div ref={renderContainerRef} className="min-w-full max-w-max">
        <Split
          sizes={issueKey ? [60, 40] : [100, 0]}
          gutterSize={issueKey ? 2 : 0}
          className="flex max-h-full w-full"
          minSize={issueKey ? 400 : 0}
        >
          <ProjectList/>
        </Split>
      </div>
    </Fragment>
  );
};

export { Projects };
