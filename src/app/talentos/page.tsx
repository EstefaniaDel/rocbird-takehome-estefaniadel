import { TalentList } from "@/components/talentos/talent-list";
import { TalentFilters } from "@/components/talentos/talent-filters";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getTalentsList } from "@/lib/services/talentService";

interface TalentsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    seniority?: string;
    status?: string;
    sort?: string;
    sortField?: string;
  };
}

export default async function TalentsPage({ searchParams }: TalentsPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const search = params?.search || "";
  const seniority = params?.seniority || "";
  const status = params?.status || "";
  const sort = params?.sort === 'asc' ? 'asc' : 'desc'; 
  const sortField =
    params?.sortField === 'seniority'
      ? 'seniority'
      : params?.sortField === 'fullName'
      ? 'fullName'
      : 'createdAt'; 
  
  const { data, totalPages } = await getTalentsList(
    page, 
    limit, 
    sort, 
    {
      search, 
      seniority,
      status
    },
    sortField
  );

  return (
    <div className="container py-6container py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Talentos</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestiona y visualiza los profesionales de Rocbird</p>
        </div>
        <Button asChild>
          <Link href="/talentos/create">
            <PlusIcon className="mr-1.5" />
            Nuevo Talento
          </Link>
        </Button>
      </div>
      
      <TalentFilters 
        initialFilters={{
          search,
          seniority,
          status
        }}
        initialSort={sort}
        initialSortField={sortField}
      />
      
      <TalentList 
        talents={data} 
        currentPage={page} 
        totalPages={totalPages} 
      />
    </div>
  );
}
