"use client";

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
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type TalentData = {
  id: string;
  fullName: string;
  role: string;
  seniority: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string | Date;
};

type TalentListProps = {
  talents: TalentData[];
  currentPage: number;
  totalPages: number;
};

function getSeniorityLabel(value: string) {
  return SENIORITY_LABELS[value];
}

function formatDate(d: string | Date) {
  const date = new Date(d);
  return date.toLocaleDateString('es-AR', {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires"
  });
}

export function TalentList({ talents, currentPage, totalPages }: TalentListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/talentos/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error al eliminar el talento");
      }
      setDeleteId(null);
      router.refresh();
    } catch (err) {
      alert("No se pudo eliminar el talento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-medium">Nombre</TableHead>
              <TableHead className="font-medium">Rol</TableHead>
              <TableHead className="font-medium">Seniority</TableHead>
              <TableHead className="font-medium">Estado</TableHead>
              <TableHead className="font-medium">Creado</TableHead>
              <TableHead className="text-right font-medium">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {talents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No se encontraron talentos
                </TableCell>
              </TableRow>
            ) : (
              talents.map((talent) => (
                <TableRow key={talent.id}>
                  <TableCell>
                    <Link href={`/talentos/${talent.id}`} className="font-medium text-primary hover:underline">
                      {talent.fullName}
                    </Link>
                  </TableCell>
                  <TableCell>{talent.role}</TableCell>
                  <TableCell>{getSeniorityLabel(talent.seniority)}</TableCell>
                  <TableCell>
                    <StatusBadge status={talent.status} />
                  </TableCell>
                  <TableCell>{formatDate(talent.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10 text-primary"
                        asChild
                      >
                        <Link href={`/talentos/${talent.id}/edit`}>
                          <PencilIcon className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-destructive/10 text-destructive"
                        onClick={() => setDeleteId(talent.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {talents.length > 0 && (
        <div className="flex justify-between items-center pt-2">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Talento</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este talento? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button onClick={handleDelete} disabled={loading}>
              {loading ? "Borrando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}