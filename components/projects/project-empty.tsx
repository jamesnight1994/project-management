"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { MdCheck, MdClose } from "react-icons/md";
import { Spinner } from "../ui/spinner";
import { type ProjectType } from "@/utils/types";

const EmtpyProject: React.FC<{
  className?: string;
  onCreate: (payload: {
    name: string;
    parentId: ProjectType["id"] | null;
  }) => void;
  onCancel: () => void;
  isCreating: boolean;
  isSubtask?: boolean;
  isEpic?: boolean;
  parentId?: ProjectType["id"];
}> = ({
  onCreate,
  onCancel,
  isCreating,
  className,
  isEpic,
  isSubtask,
  parentId,
  ...props
}) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function initialType() {
    if (isSubtask) return "SUBTASK";
    if (isEpic) return "EPIC";
    return "TASK";
  }

  useEffect(() => {
    focusInput();
  }, [props]);

  function focusInput() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleSelect() {
    setTimeout(() => focusInput(), 50);
  }
  function handleCreateProject(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!name) {
        return;
      }

      onCreate({ name, parentId: parentId ?? null });
      setName("");
    }
  }

  return (
    <div
      {...props}
      className={clsx(
        "relative flex items-center gap-x-2 border-2 border-blue-400 bg-white p-1.5",
        className
      )}
    >
      
      <label htmlFor="empty-issue-input" className="sr-only">
        Empty issue input
      </label>
      <input
        ref={inputRef}
        autoFocus
        type="text"
        id="empty-issue-input"
        placeholder="What needs to be done?"
        className=" w-full pl-2 pr-20 text-sm focus:outline-none"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        onKeyDown={handleCreateProject}
      />
      {isCreating ? (
        <div className="absolute right-2 z-10">
          <Spinner size="sm" />
        </div>
      ) : (
        <div className="absolute right-2 z-10 flex gap-x-1">
          <Button
            className="aspect-square shadow-md"
            onClick={() => onCancel()}
          >
            <MdClose className="text-sm" />
          </Button>
          <Button
            className="aspect-square shadow-md"
            onClick={() =>
              onCreate({
                name,
                parentId: parentId ?? null,
              })
            }
          >
            <MdCheck className="text-sm" />
          </Button>
        </div>
      )}
    </div>
  );
};

export { EmtpyProject };
