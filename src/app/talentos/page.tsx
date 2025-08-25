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
  };
}

export default async function TalentsPage({ searchParams }: TalentsPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const search = params?.search || "";
  const seniority = params?.seniority || "";
  const status = params?.status || "";
  
  const { data, totalPages } = await getTalentsList(
    page, 
    limit, 
    'desc', 
    {
      search, 
      seniority,
      status
    }
  );

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Talentos</h1>
        <Button asChild>
          <Link href="/talentos/create">
            <PlusIcon className="mr-2 h-4 w-4" />
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
      />
      
      <TalentList 
        talents={data} 
        currentPage={page} 
        totalPages={totalPages} 
      />
    </div>
  );
}
