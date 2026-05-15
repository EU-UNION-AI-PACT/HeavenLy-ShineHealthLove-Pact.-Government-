-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'TENANT_ADMIN', 'PILGRIM', 'PARENT', 'JUNIOR');

-- CreateEnum
CREATE TYPE "PetitionVisibility" AS ENUM ('PUBLIC', 'TENANT_ONLY', 'PRIVATE');

-- CreateEnum
CREATE TYPE "PetitionStatus" AS ENUM ('HOFFNUNG', 'HEILUNG', 'GEWISSHEIT');

-- CreateEnum
CREATE TYPE "NewsCategory" AS ENUM ('GOVERNANCE', 'GIESSFAST', 'COMMUNITY', 'PASSAGE', 'GUARDIAN');

-- CreateEnum
CREATE TYPE "VacancyStatus" AS ENUM ('WAITING', 'MATCHED', 'GOLDEN');

-- CreateEnum
CREATE TYPE "JuniorTransitionStatus" AS ENUM ('ACTIVE_JUNIOR', 'PENDING_TRANSITION', 'TRANSITIONED');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "countryCode" TEXT NOT NULL DEFAULT 'DE',
    "nodeId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "name" TEXT,
    "passwordHash" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PILGRIM',
    "sovereignId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isMentorReady" BOOLEAN NOT NULL DEFAULT false,
    "isVerifiedMentor" BOOLEAN NOT NULL DEFAULT false,
    "dateOfBirth" TIMESTAMP(3),
    "countryCode" TEXT NOT NULL DEFAULT 'DE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "consentGivenAt" TIMESTAMP(3),
    "consentVersion" TEXT,
    "deletedAt" TIMESTAMP(3),
    "anonymizedAt" TIMESTAMP(3),
    "dataMinimized" BOOLEAN NOT NULL DEFAULT false,
    "portabilityRequestedAt" TIMESTAMP(3),
    "tenantId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "parent_child_links" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "encryptedKey" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "inviteToken" TEXT,
    "inviteExpiresAt" TIMESTAMP(3),
    "activatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parent_child_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "junior_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "transitionStatus" "JuniorTransitionStatus" NOT NULL DEFAULT 'ACTIVE_JUNIOR',
    "transitionConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "junior_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "petitions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "visibility" "PetitionVisibility" NOT NULL DEFAULT 'PRIVATE',
    "status" "PetitionStatus" NOT NULL DEFAULT 'HOFFNUNG',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "anonymizedAt" TIMESTAMP(3),
    "purposeCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "petitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "NewsCategory" NOT NULL DEFAULT 'COMMUNITY',
    "isGolden" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT,
    "recipientId" TEXT,
    "tenantId" TEXT,

    CONSTRAINT "news_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancies" (
    "id" TEXT NOT NULL,
    "arriverId" TEXT NOT NULL,
    "mentorId" TEXT,
    "isJunior" BOOLEAN NOT NULL DEFAULT false,
    "countryCode" TEXT NOT NULL DEFAULT 'DE',
    "status" "VacancyStatus" NOT NULL DEFAULT 'WAITING',
    "matchedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_workspaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_workspace_members" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_workspace_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dsgvo_audit_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "detail" TEXT,
    "ipHash" TEXT,
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dsgvo_audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resonanz_bilanz" (
    "id" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "giessFactInput" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "transmutationRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "goldProjects" INTEGER NOT NULL DEFAULT 0,
    "vacanciesFilled" INTEGER NOT NULL DEFAULT 0,
    "newArrivals" INTEGER NOT NULL DEFAULT 0,
    "juniorSynced" INTEGER NOT NULL DEFAULT 0,
    "parentRelaySuccess" INTEGER NOT NULL DEFAULT 0,
    "transitions18" INTEGER NOT NULL DEFAULT 0,
    "attacksBlocked" INTEGER NOT NULL DEFAULT 0,
    "resonanceFrequency" DOUBLE PRECISION NOT NULL DEFAULT 432,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resonanz_bilanz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_sovereignId_key" ON "users"("sovereignId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "parent_child_links_childId_key" ON "parent_child_links"("childId");

-- CreateIndex
CREATE UNIQUE INDEX "parent_child_links_inviteToken_key" ON "parent_child_links"("inviteToken");

-- CreateIndex
CREATE UNIQUE INDEX "junior_profiles_userId_key" ON "junior_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "family_workspace_members_workspaceId_userId_key" ON "family_workspace_members"("workspaceId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "resonanz_bilanz_reportDate_key" ON "resonanz_bilanz"("reportDate");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_links" ADD CONSTRAINT "parent_child_links_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_links" ADD CONSTRAINT "parent_child_links_childId_fkey" FOREIGN KEY ("childId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "junior_profiles" ADD CONSTRAINT "junior_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petitions" ADD CONSTRAINT "petitions_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petitions" ADD CONSTRAINT "petitions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_items" ADD CONSTRAINT "news_items_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_items" ADD CONSTRAINT "news_items_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_items" ADD CONSTRAINT "news_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_workspace_members" ADD CONSTRAINT "family_workspace_members_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "family_workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_workspace_members" ADD CONSTRAINT "family_workspace_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
