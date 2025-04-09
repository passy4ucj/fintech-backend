import { prisma } from "../client";
import { AuditLog } from "@prisma/client";

export type AuditLogAccount = Pick<
    AuditLog,
    "userId" | "action" | "details"
    >;

export const createAuditLog = async (data: AuditLogAccount) => {
   const auditLog = await prisma.auditLog.create({
         data: { ...data },
   });
   return auditLog;
};
