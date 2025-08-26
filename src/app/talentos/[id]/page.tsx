import { getTalentById } from "@/lib/services/talentService";
import { TalentDetail } from "@/components/talentos/talent-detail";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";

interface TalentDetailPageProps {
  params: {
    id: string;
  };
}

export default async function TalentDetailPage({ params }: TalentDetailPageProps) {
  const { id } = params;

  const talent = await getTalentById(id);

  if (!talent) {
    notFound();
  }

  return (
    <div className="container py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Detalles del Talento</h1>
          <p className="text-muted-foreground mt-1">{talent.fullName}</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="shadow-sm" asChild>
            <Link href="/talentos">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button variant="default" size="sm" className="shadow-sm" asChild>
            <Link href={`/talentos/${talent.id}/edit`}>
              <PencilIcon className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
        <div className="p-6">
          <TalentDetail talent={talent} />
        </div>
      </div>
    </div>
  );
}
