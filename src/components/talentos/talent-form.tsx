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
import { UserIcon, BriefcaseIcon, AwardIcon, ActivityIcon, UserCheckIcon, UserCogIcon } from "lucide-react";

interface SelectablePerson {
  id: string;
  fullName: string;
}
interface TalentFormProps {
  talentId?: string;
  initialValues?: Partial<Talent>;
  leaders: SelectablePerson[];
  mentors: SelectablePerson[];
  excludeFullName?: boolean;
}

export function TalentForm({ talentId, initialValues, leaders, mentors, excludeFullName = false }: TalentFormProps) {
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

  // La nueva clase para los FormItems que queremos en línea horizontal
  const inlineFormItemClass = "grid grid-cols-[150px_1fr] gap-4 items-center";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Nombre completo (condicionalmente renderizado) */}
          {!excludeFullName && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className={inlineFormItemClass}>
                  <FormLabel className="flex items-center m-0">
                    <UserIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    Nombre Completo:
                  </FormLabel>
                  <div>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}

          {/* Rol */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className={inlineFormItemClass}>
                <FormLabel className="flex items-center m-0">
                  <BriefcaseIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                  Rol:
                </FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Backend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Seniority */}
          <FormField
            control={form.control}
            name="seniority"
            render={({ field }) => (
              <FormItem className={inlineFormItemClass}>
                <FormLabel className="flex items-center m-0">
                  <AwardIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                  Seniority:
                </FormLabel>
                <div>
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
                </div>
              </FormItem>
            )}
          />

          {/* Estado */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className={inlineFormItemClass}>
                <FormLabel className="flex items-center m-0">
                  <ActivityIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                  Estado:
                </FormLabel>
                <div>
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
                </div>
              </FormItem>
            )}
          />

          {/* Líder */}
          <FormField
            control={form.control}
            name="leaderId"
            render={({ field }) => (
              <FormItem className={inlineFormItemClass}>
                <FormLabel className="flex items-center m-0">
                  <UserCogIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                  Líder:
                </FormLabel>
                <div>
                  <Select 
                    onValueChange={(v) => field.onChange(v === "__NONE__" ? undefined : v)}
                    value={field.value ?? ""}
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
                </div>
              </FormItem>
            )}
          />

          {/* Mentor */}
          <FormField
            control={form.control}
            name="mentorId"
            render={({ field }) => (
              <FormItem className={inlineFormItemClass}>
                <FormLabel className="flex items-center m-0">
                  <UserCheckIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                  Mentor:
                </FormLabel>
                <div>
                  <Select 
                    onValueChange={(v) => field.onChange(v === "__NONE__" ? undefined : v)}
                    value={field.value ?? ""}
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
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/talentos")} 
            className="sm:order-1 sm:flex-1"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={form.formState.isSubmitting} 
            className="sm:order-2 sm:flex-1"
          >
            {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
