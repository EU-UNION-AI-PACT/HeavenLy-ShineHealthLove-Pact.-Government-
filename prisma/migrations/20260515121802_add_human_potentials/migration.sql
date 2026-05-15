-- CreateEnum
CREATE TYPE "BridgeStatus" AS ENUM ('INCEPTION', 'MAPPING', 'MATCHING', 'BRIDGE_FOUND', 'ACTIVE', 'FULFILLED');

-- CreateTable
CREATE TABLE "human_potentials" (
    "id" TEXT NOT NULL,
    "anonymousRef" TEXT NOT NULL,
    "profile" JSONB NOT NULL,
    "fieldKey" TEXT NOT NULL,
    "bridgeStatus" "BridgeStatus" NOT NULL DEFAULT 'INCEPTION',
    "anonymizedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "human_potentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "human_potentials_anonymousRef_key" ON "human_potentials"("anonymousRef");
