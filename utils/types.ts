import { type GetIssuesResponse } from "@/app/api/issues/route";

export type IssueCountType = {
  TODO: number;
  IN_PROGRESS: number;
  DONE: number;
};

export type MenuOptionType = {
  label: string;
  id: string;
};

export type IssueType = GetIssuesResponse["issues"][number];

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
  teamMembers: string[];
};