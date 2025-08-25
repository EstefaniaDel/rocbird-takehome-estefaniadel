"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TalentFormValues } from "@/lib/validations/talent";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Talent } from "@/generated/prisma";
import { SENIORITY_OPTIONS, STATUS_OPTIONS } from "@/constants/talentEnums";

interface SelectablePerson {
  id: string;
  fullName: string;
}
interface TalentFormProps {
  talentId?: string;
  initialValues?: Partial<Talent>;
  leaders: SelectablePerson[];
  mentors: SelectablePerson[];
}

export function TalentForm({ talentId, initialValues, leaders, mentors }: TalentFormProps) {
  const router = useRouter();
  const isEditing = !!talentId;

  const form = useForm<TalentFormValues>({
    defaultValues: initialValues
      ? {
          fullName: initialValues.fullName || "",
          role: initialValues.role || "",
          seniority: initialValues.seniority || "",
          status: initialValues.status || "ACTIVE",
          leaderId: initialValues.leaderId ?? undefined,
          mentorId: initialValues.mentorId ?? undefined,
        }
      : {
          fullName: "",
          role: "",
          seniority: "",
          status: "ACTIVE",
        },
  });

  async function onSubmit(data: TalentFormValues) {
    const url = isEditing ? `/api/talentos/${talentId}` : "/api/talentos";
    const method = isEditing ? "PUT" : "POST";
    const action = isEditing ? 'actualizado' : 'creado';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al ${action} el talento`);
      }

      toast.success(`Talento ${action} correctamente.`);

      router.push("/talentos");
      router.refresh();
    } catch (error) {
      toast.error("Ocurrió un error inesperado.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <Input placeholder="Backend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seniority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seniority</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar seniority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                 {SENIORITY_OPTIONS.map((option) => (
                   <SelectItem key={option.value} value={option.value}>
                     {option.label}
                   </SelectItem>
                 ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                 {STATUS_OPTIONS.map((option) => (
                   <SelectItem key={option.value} value={option.value}>
                     {option.label}
                   </SelectItem>
                 ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Líder</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sin líder" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="__NONE__">Sin líder</SelectItem>
                  {leaders.map((leader) => (
                    <SelectItem key={leader.id} value={leader.id}>
                      {leader.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mentorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mentor</FormLabel>
              <Select 
                onValueChange={field.onChange}
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sin mentor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="__NONE__">Sin mentor</SelectItem>
                  {mentors.map((mentor) => (
                    <SelectItem key={mentor.id} value={mentor.id}>
                      {mentor.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </Form>
  );
}
