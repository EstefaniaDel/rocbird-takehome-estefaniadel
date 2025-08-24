import prisma from "@/lib/prisma";
import { TalentFormValues } from "@/lib/validations/talent";

export const getTalentsList = async (page: number, limit: number) => {
  const talents = await prisma.talent.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      fullName: "asc",
    },
    select: {
      id: true,
      fullName: true,
      role: true,
      seniority: true,
      status: true,
    },
  });

  const totalTalents = await prisma.talent.count();

  return {
    data: talents,
    totalPages: Math.ceil(totalTalents / limit),
  };
};

export const getTalentById = async (id: string) => {
  return prisma.talent.findUnique({
    where: { id },
    include: {
      leader: true,
      mentor: true,
      interactions: {
        orderBy: { date: "desc" },
      },
    },
  });
};

export const createTalent = async (data: TalentFormValues) => {
  return prisma.talent.create({
    data,
  });
};

export const updateTalent = async (
  id: string,
  data: Partial<TalentFormValues>
) => {
  return prisma.talent.update({
    where: { id },
    data,
  });
};

export const deleteTalent = async (id: string) => {
  return prisma.talent.delete({
    where: { id },
  });
};
