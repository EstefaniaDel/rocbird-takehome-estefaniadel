import { type Talent } from "@/generated/prisma";

interface TalentDetailProps {
  talent: Talent & {
    leader?: { id: string; fullName: string } | null;
    mentor?: { id: string; fullName: string } | null;
  };
}

export function TalentDetail({ talent }: TalentDetailProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">Nombre</h3>
          <p>{talent.fullName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Líder</h3>
          <p>{talent.leader?.fullName || "Sin líder asignado"}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Mentor</h3>
          <p>{talent.mentor?.fullName || "Sin mentor asignado"}</p>
        </div>
      </div>
    </div>
  );
}