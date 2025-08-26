import { getTalentById, getTechnicalLeads } from "@/lib/services/talentService";
import { TalentForm } from "@/components/talentos/talent-form";
import { notFound } from "next/navigation";
import { UserCog } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface EditTalentPageProps {
  params: {
    id: string;
  };
}

export default async function EditTalentPage({ params }: EditTalentPageProps) {
  const awaitedParams = await params;
  const { id } = awaitedParams;

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
    <div className="container py-8 max-w-3xl mx-auto">
      <Card className="border shadow-sm">
  <CardHeader className="border-b bg-muted/30">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight flex items-center">
          <UserCog className="mr-2 h-5 w-5 text-muted-foreground" />
          Editar Talento
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {talent.fullName}
        </p>
      </div>
    </div>
  </CardHeader>
        <CardContent className="pt-6">
          <TalentForm
            talentId={talent.id}
            initialValues={talent}
            leaders={leaders}
            mentors={mentors}
          />
        </CardContent>
      </Card>
    </div>
  );
}
