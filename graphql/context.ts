import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

export type Context = {
    prisma: PrismaClient;
};

export async function createContext(_req: any, _res: any): Promise<Context> {
    return { prisma };
}
