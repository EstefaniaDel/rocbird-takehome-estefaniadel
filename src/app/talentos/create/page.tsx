import { getTechnicalLeads } from "@/lib/services/talentService";
import { TalentForm } from "@/components/talentos/talent-form";

export default async function CreateTalentPage() {
  const technicalLeads = await getTechnicalLeads();

  const leaders = technicalLeads;
  const mentors = technicalLeads;

  return (
    <div className="container py-6container py-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Talento</h1>
      </div>
      <TalentForm 
        leaders={leaders}
        mentors={mentors}
      />
    
    </div>
  );
}
