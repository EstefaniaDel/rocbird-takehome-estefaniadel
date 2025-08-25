import { getTechnicalLeads } from "@/lib/services/talentService";
import { TalentForm } from "@/components/talentos/talent-form";

export default async function CreateTalentPage() {
  const technicalLeads = await getTechnicalLeads();

  const leaders = technicalLeads;
  const mentors = technicalLeads;

  return (
    <div className="container py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Talento</h1>
      <TalentForm 
        leaders={leaders}
        mentors={mentors}
      />
    </div>
  );
}
