-- CreateEnum
CREATE TYPE "BridgeMessageSender" AS ENUM ('ADMIN', 'HUMAN');

-- CreateTable
CREATE TABLE "bridge_messages" (
    "id" TEXT NOT NULL,
    "anonymousRef" TEXT NOT NULL,
    "sender" "BridgeMessageSender" NOT NULL,
    "content" TEXT NOT NULL,
    "isReadByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isReadByHuman" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bridge_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bridge_messages_anonymousRef_idx" ON "bridge_messages"("anonymousRef");
