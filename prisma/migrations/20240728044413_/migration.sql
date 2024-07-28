-- AlterTable
CREATE SEQUENCE notificationreports_reportid_seq;
ALTER TABLE "NotificationReports" ALTER COLUMN "reportId" SET DEFAULT nextval('notificationreports_reportid_seq');
ALTER SEQUENCE notificationreports_reportid_seq OWNED BY "NotificationReports"."reportId";
