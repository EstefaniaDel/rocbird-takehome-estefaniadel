import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { PencilIcon, EyeIcon } from "lucide-react";
import Link from "next/link";

interface TalentCardProps {
  talent: {
    id: string;
    fullName: string;
    role: string;
    seniority: string;
    status: "ACTIVE" | "INACTIVE";
    leader?: { fullName: string } | null;
    mentor?: { fullName: string } | null;
  };
}

export function TalentCard({ talent }: TalentCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{talent.fullName}</h3>
            <p className="text-sm text-muted-foreground">{talent.role}</p>
          </div>
          <StatusBadge status={talent.status} />
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="grid grid-cols-1 gap-2">
          <div>
            <p className="text-sm font-medium">Seniority</p>
            <p className="text-sm">{talent.seniority}</p>
          </div>
          
          {talent.leader && (
            <div>
              <p className="text-sm font-medium">Líder</p>
              <p className="text-sm">{talent.leader.fullName}</p>
            </div>
          )}
          
          {talent.mentor && (
            <div>
              <p className="text-sm font-medium">Mentor</p>
              <p className="text-sm">{talent.mentor.fullName}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-end gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/talentos/${talent.id}`}>
            <EyeIcon className="mr-1 h-4 w-4" />
            Ver
          </Link>
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link href={`/talentos/${talent.id}/edit`}>
            <PencilIcon className="mr-1 h-4 w-4" />
            Editar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}