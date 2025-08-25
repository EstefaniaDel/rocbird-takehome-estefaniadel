import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { StatusBadge } from "@/components/shared/status-badge";
  import { Pagination } from "@/components/shared/pagination";
  import Link from "next/link";
  import { Button } from "@/components/ui/button";
  import { PencilIcon, TrashIcon } from "lucide-react";
  import { SENIORITY_LABELS } from "@/constants/talentEnums";
  
  type TalentData = {
    id: string;
    fullName: string;
    role: string;
    seniority: string;
    status: "ACTIVE" | "INACTIVE";
  };
  
  type TalentListProps = {
    talents: TalentData[];
    currentPage: number;
    totalPages: number;
  };

  function getSeniorityLabel(value: string) {
    return SENIORITY_LABELS[value];
  }
  
  export function TalentList({ talents, currentPage, totalPages }: TalentListProps) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Seniority</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {talents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No se encontraron talentos
                  </TableCell>
                </TableRow>
              ) : (
                talents.map((talent) => (
                  <TableRow key={talent.id}>
                    <TableCell className="font-medium">
                      <Link href={`/talentos/${talent.id}`} className="hover:underline">
                        {talent.fullName}
                      </Link>
                    </TableCell>
                    <TableCell>{talent.role}</TableCell>
                    <TableCell>{getSeniorityLabel(talent.seniority)}</TableCell>
                    <TableCell>
                      <StatusBadge status={talent.status} />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/talentos/${talent.id}/edit`}>
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/talentos/${talent.id}/delete`}>
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {talents.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    );
  }