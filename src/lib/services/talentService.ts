import { Prisma, TalentStatus } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { TalentFormValues } from "@/lib/validations/talent";

type SortDirection = 'asc' | 'desc';
type SortField = 'createdAt' | 'seniority' | 'fullName';

interface TalentFilters {
  search?: string;
  seniority?: string;
  status?: string;
}

export const getTalentsList = async (
  page: number, 
  limit: number, 
  sort: SortDirection = 'asc',
  filters: TalentFilters = {},
  sortField: SortField = 'createdAt'
) => {
  const whereClause: Prisma.TalentWhereInput = {};
  
  if (filters.search && filters.search.trim()) {
    whereClause.fullName = {
      contains: filters.search,
      mode: 'insensitive'
    };
  }
  
  if (filters.seniority && filters.seniority !== 'all') {
    whereClause.seniority = filters.seniority;
  }
  
  if (filters.status && filters.status !== 'all') {
    if (filters.status === 'ACTIVE') {
      whereClause.status = TalentStatus.ACTIVE;
    } else if (filters.status === 'INACTIVE') {
      whereClause.status = TalentStatus.INACTIVE;
    }
  }

  const orderBy: Prisma.TalentOrderByWithRelationInput =
    sortField === 'seniority'
      ? { seniority: sort }
      : sortField === 'fullName'
      ? { fullName: sort }
      : { createdAt: sort };

  const talents = await prisma.talent.findMany({
    where: whereClause,
    skip: (page - 1) * limit,
    take: limit,
    orderBy,
    select: {
      id: true,
      fullName: true,
      role: true,
      seniority: true,
      status: true,
      createdAt: true,
    },
  });

  const totalTalents = await prisma.talent.count({ where: whereClause });

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

export const getTechnicalLeads = async () => {
  return prisma.technicalLead.findMany({
    orderBy: {
      fullName: 'asc',
    },
    distinct: ['fullName'],
    select: {
      id: true,
      fullName: true,
    },
  });
};
