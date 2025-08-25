"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

export default function DeleteTalentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/talentos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar talento");
      toast("Talento eliminado exitosamente");
      router.push("/talentos");
    } catch (e: unknown) {
      toast(e instanceof Error ? e.message : "Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setOpen(false);
    router.push("/talentos");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">Eliminar Talento</DialogTitle>
        </DialogHeader>
        <p>¿Estás seguro que deseas eliminar este talento? Esta acción no se puede deshacer.</p>
        <DialogFooter className="flex gap-4">
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}