import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { type Project } from "@prisma/client";

export type GetProjectsResponse = {
  projects: Project[] | null;
};

export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json({ projects });
}