"use client";

import { type ProjectType } from "@/utils/types";
import { usePathname, useSearchParams } from "next/navigation";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type SelectedProjectContextProps = {
  projectKey: ProjectType["id"] | null;
  setProjectKey: React.Dispatch<React.SetStateAction<ProjectType["key"] | null>>;
};

const SelectedProjectContext = createContext<SelectedProjectContextProps>({
  projectKey: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProjectKey: () => {},
});

export const SelectedProjectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [projectKey, setProjectKey] = useState<ProjectType["key"] | null>(null);

  const setSelectedProjectUrl = useCallback(
    (key: ProjectType["id"] | null) => {
      const urlWithQuery = pathname + (key ? `?selectedProject=${key}` : "");
      window.history.pushState(null, "", urlWithQuery);
    },
    [pathname]
  );

  useEffect(() => {
    setProjectKey(searchParams.get("selectedProject"));
  }, [searchParams]);

  useEffect(() => {
    setSelectedProjectUrl(projectKey);
  }, [projectKey, setSelectedProjectUrl]);

  return (
    <SelectedProjectContext.Provider value={{ projectKey, setProjectKey }}>
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectContext = () => useContext(SelectedProjectContext);
