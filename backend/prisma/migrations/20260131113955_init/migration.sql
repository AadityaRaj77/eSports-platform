-- CreateEnum
CREATE TYPE "GameGenre" AS ENUM ('BATTLE_ROYAL', 'CLASH_ROYALE', 'SHOOTER', 'PLATFORMER', 'SPORTS', 'FIGHTING', 'RACING', 'STRATEGY', 'ARCADE', 'OTHER');

-- CreateEnum
CREATE TYPE "GameName" AS ENUM ('BGMI', 'FREEFIRE', 'COD', 'OTHERS');

-- CreateEnum
CREATE TYPE "TeamType" AS ENUM ('TEAM', 'CREW');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('MEMBER', 'LEADER', 'CAPTAIN', 'CO_CAPTAIN');

-- CreateEnum
CREATE TYPE "FriendRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "TournamentEntryType" AS ENUM ('TEAM', 'PLAYER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "gamertag" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "primaryGenre" "GameGenre",
    "rating" DOUBLE PRECISION DEFAULT 1000,
    "matchesPlayed" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "activeStartTime" TEXT,
    "activeEndTime" TEXT,
    "role" TEXT,
    "location" TEXT,
    "badgesCount" INTEGER NOT NULL DEFAULT 0,
    "friendsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_game_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "game" "GameName" NOT NULL,
    "otherGameName" TEXT,
    "gameProfileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_game_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "passwordHash" TEXT,
    "type" "TeamType" NOT NULL DEFAULT 'TEAM',
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "logoUrl" TEXT,
    "tagline" TEXT,
    "about" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT,
    "requirements" JSONB,
    "isDisbanded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_memberships" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "MembershipRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "team_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendships" (
    "id" TEXT NOT NULL,
    "userAId" TEXT NOT NULL,
    "userBId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friend_requests" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "message" TEXT,
    "status" "FriendRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friend_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT,
    "isOffline" BOOLEAN NOT NULL DEFAULT false,
    "venue" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "game" "GameName" NOT NULL,
    "requirements" JSONB,
    "feeAmount" DOUBLE PRECISION,
    "organizerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "results" JSONB,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_teams" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentPaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tournament_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_players" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentPaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tournament_players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_invites" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "invitedById" TEXT NOT NULL,
    "invitedUserEmail" TEXT,
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "team_invites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_gamertag_key" ON "users"("gamertag");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "player_game_profiles_userId_idx" ON "player_game_profiles"("userId");

-- CreateIndex
CREATE INDEX "achievements_userId_idx" ON "achievements"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "teams_code_key" ON "teams"("code");

-- CreateIndex
CREATE INDEX "teams_creatorId_idx" ON "teams"("creatorId");

-- CreateIndex
CREATE INDEX "team_memberships_userId_idx" ON "team_memberships"("userId");

-- CreateIndex
CREATE INDEX "team_memberships_teamId_idx" ON "team_memberships"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "team_memberships_teamId_userId_key" ON "team_memberships"("teamId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "friendships_userAId_userBId_key" ON "friendships"("userAId", "userBId");

-- CreateIndex
CREATE INDEX "friend_requests_toId_idx" ON "friend_requests"("toId");

-- CreateIndex
CREATE UNIQUE INDEX "friend_requests_fromId_toId_key" ON "friend_requests"("fromId", "toId");

-- CreateIndex
CREATE INDEX "tournaments_organizerId_idx" ON "tournaments"("organizerId");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_teams_tournamentId_teamId_key" ON "tournament_teams"("tournamentId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_players_tournamentId_playerId_key" ON "tournament_players"("tournamentId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "badges_key_key" ON "badges"("key");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_userId_badgeId_key" ON "user_badges"("userId", "badgeId");

-- CreateIndex
CREATE INDEX "team_invites_teamId_idx" ON "team_invites"("teamId");

-- AddForeignKey
ALTER TABLE "player_game_profiles" ADD CONSTRAINT "player_game_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_toId_fkey" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_teams" ADD CONSTRAINT "tournament_teams_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_teams" ADD CONSTRAINT "tournament_teams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
