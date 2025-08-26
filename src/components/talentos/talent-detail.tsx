import { type Talent } from "@/generated/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { SENIORITY_LABELS } from "@/constants/talentEnums";
import { UserIcon, BriefcaseIcon, UserCheckIcon } from "lucide-react";

interface TalentDetailProps {
  talent: Talent & {
    leader?: { id: string; fullName: string } | null;
    mentor?: { id: string; fullName: string } | null;
  };
}

export function TalentDetail({ talent }: TalentDetailProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium flex items-center mb-4">
            <UserIcon className="mr-2 h-5 w-5 text-primary" />
            Información Personal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Nombre Completo</h3>
              <p className="mt-1 text-base">{talent.fullName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
              <div className="mt-1">
                <StatusBadge status={talent.status} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium flex items-center mb-4">
            <BriefcaseIcon className="mr-2 h-5 w-5 text-primary" />
            Información Profesional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Rol</h3>
              <p className="mt-1 text-base">{talent.role}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Seniority</h3>
              <p className="mt-1 text-base">{SENIORITY_LABELS[talent.seniority] || talent.seniority}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium flex items-center mb-4">
            <UserCheckIcon className="mr-2 h-5 w-5 text-primary" />
            Mentores y Líderes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Líder</h3>
              <p className="mt-1 text-base">{talent.leader?.fullName || "Sin líder asignado"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Mentor</h3>
              <p className="mt-1 text-base">{talent.mentor?.fullName || "Sin mentor asignado"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}