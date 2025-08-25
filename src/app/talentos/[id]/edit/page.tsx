import { getTalentById, getTechnicalLeads } from "@/lib/services/talentService";
import { TalentForm } from "@/components/talentos/talent-form";
import { notFound } from "next/navigation";

interface EditTalentPageProps {
  params: {
    id: string;
  };
}

export default async function EditTalentPage({ params }: EditTalentPageProps) {
  const { id } = params;

  const [talent, technicalLeads] = await Promise.all([
    getTalentById(id),
    getTechnicalLeads(),
  ]);

  if (!talent) {
    notFound();
  }

  const leaders = technicalLeads;
  const mentors = technicalLeads;

  return (
    <div className="container py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Editar Talento</h1>
      <TalentForm
        talentId={talent.id}
        initialValues={talent}
        leaders={leaders}
        mentors={mentors}
      />
    </div>
  );
}
