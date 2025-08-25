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
    <div className="container py-8 max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalles del Talento</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/talentos">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={`/talentos/${talent.id}/edit`}>
              <PencilIcon className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </div>
      
      <TalentDetail talent={talent} />
    </div>
  );
}
