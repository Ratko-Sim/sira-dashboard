-- DropIndex
DROP INDEX `Session_userId_fkey` ON `session`;

-- CreateIndex
CREATE INDEX `Issue_assignedToUserId_idx` ON `Issue`(`assignedToUserId`);

-- RenameIndex
ALTER TABLE `account` RENAME INDEX `Account_userId_fkey` TO `Account_userId_idx`;
