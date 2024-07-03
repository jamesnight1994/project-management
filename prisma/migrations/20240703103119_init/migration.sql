-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('BUG', 'TASK', 'SUBTASK', 'STORY', 'EPIC');

-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "SprintStatus" AS ENUM ('ACTIVE', 'PENDING', 'CLOSED');

-- CreateEnum
CREATE TYPE "Duration" AS ENUM ('ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'FOUR_WEEKS', 'CUSTOM');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "defaultAssignee" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "IssueStatus" NOT NULL DEFAULT 'TODO',
    "type" "IssueType" NOT NULL DEFAULT 'TASK',
    "sprintPosition" DOUBLE PRECISION NOT NULL,
    "boardPosition" DOUBLE PRECISION NOT NULL DEFAULT -1,
    "reporterId" TEXT NOT NULL DEFAULT '1',
    "assigneeId" TEXT,
    "parentId" TEXT,
    "sprintId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "sprintColor" TEXT,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "status" "SprintStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "issueId" TEXT NOT NULL,
    "logId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DefaultUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "DefaultUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_key_key" ON "Project"("key");

-- CreateIndex
CREATE INDEX "Member_projectId_idx" ON "Member"("projectId");

-- CreateIndex
CREATE INDEX "Issue_sprintId_idx" ON "Issue"("sprintId");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_key_creatorId_key" ON "Issue"("key", "creatorId");

-- CreateIndex
CREATE INDEX "Comment_issueId_idx" ON "Comment"("issueId");
