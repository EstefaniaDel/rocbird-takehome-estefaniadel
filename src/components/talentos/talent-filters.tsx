"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchIcon, FilterIcon, XCircleIcon, ListFilter } from "lucide-react";
import { SENIORITY_OPTIONS, STATUS_OPTIONS } from "@/constants/talentEnums";

interface TalentFiltersProps {
  initialFilters?: {
    search?: string;
    seniority?: string;
    status?: string;
  };
  initialSort?: 'asc' | 'desc';
  initialSortField?: 'createdAt' | 'seniority' | 'fullName';
}

export function TalentFilters({ initialFilters = {}, initialSort = 'desc', initialSortField = 'createdAt' }: TalentFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [search, setSearch] = useState(initialFilters.search || "");
  const [seniority, setSeniority] = useState(initialFilters.seniority || "all");
  const [status, setStatus] = useState(initialFilters.status || "all");
  const [sort, setSort] = useState<'asc' | 'desc'>(initialSort);
  const [sortField, setSortField] = useState<'createdAt' | 'seniority' | 'fullName'>(initialSortField);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  const buildParams = (overrides?: Partial<{ search: string; seniority: string; status: string; sort: 'asc' | 'desc'; sortField: 'createdAt' | 'seniority' | 'fullName'; page: string }>) => {
    const params = new URLSearchParams();

    const effectiveSearch = overrides?.search ?? search;
    const effectiveSeniority = overrides?.seniority ?? seniority;
    const effectiveStatus = overrides?.status ?? status;
    const effectiveSort = overrides?.sort ?? sort;
    const effectiveSortField = overrides?.sortField ?? sortField;

    if (effectiveSearch.trim()) params.append("search", effectiveSearch.trim());
    if (effectiveSeniority !== "all") params.append("seniority", effectiveSeniority);
    if (effectiveStatus !== "all") params.append("status", effectiveStatus);
    if (effectiveSort) params.append("sort", effectiveSort);
    if (effectiveSortField) params.append("sortField", effectiveSortField);

    params.append("page", overrides?.page ?? "1");
    return params;
  };

  const applyFilters = () => {
    router.push(`${pathname}?${buildParams().toString()}`);
    setIsPopoverOpen(false);
  };
  
  const clearFilters = () => {
    setSearch("");
    setSeniority("all");
    setStatus("all");
    setSort('desc');
    setSortField('createdAt');
    router.push(pathname);
  };
  
  const hasActiveFilters = search.trim() !== "" || seniority !== "all" || status !== "all";
  
  const activeAdvancedFilterCount = [
    seniority !== "all",
    status !== "all"
  ].filter(Boolean).length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  // Presets for the "Ordenar" menu
  const applySortPreset = (preset: 'alpha' | 'seniority' | 'createdAt') => {
    if (preset === 'alpha') {
      setSortField('fullName');
      setSort('asc');
      router.push(`${pathname}?${buildParams({ sortField: 'fullName', sort: 'asc' }).toString()}`);
      return;
    }
    if (preset === 'seniority') {
      // JUNIOR -> SEMI_SENIOR -> SENIOR (asc)
      setSortField('seniority');
      setSort('asc');
      router.push(`${pathname}?${buildParams({ sortField: 'seniority', sort: 'asc' }).toString()}`);
      return;
    }
    // createdAt: Nuevos primero (desc)
    setSortField('createdAt');
    setSort('desc');
    router.push(`${pathname}?${buildParams({ sortField: 'createdAt', sort: 'desc' }).toString()}`);
  };

  const currentSortLabel = () => {
    if (sortField === 'fullName' && sort === 'asc') return 'Alfabético (A→Z)';
    if (sortField === 'seniority' && sort === 'asc') return 'Seniority (Juniors primero)';
    if (sortField === 'createdAt' && sort === 'desc') return 'Fecha creación (Nuevos primero)';
    return 'Orden personalizado';
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex items-center flex-grow border rounded px-3 h-10 bg-white focus-within:ring-2 focus-within:ring-primary transition">
      <SearchIcon className="h-4 w-4 text-muted-foreground mr-2" />
      <input
        type="text"
        placeholder="Buscar talento por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none border-none text-base placeholder:text-muted-foreground"
      />
    </div>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="h-10"
        disabled={!hasActiveFilters}
        aria-disabled={!hasActiveFilters}
      >
        <XCircleIcon className="mr-2 h-4 w-4" />
        Limpiar
      </Button>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-10 relative">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtros
            {activeAdvancedFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                {activeAdvancedFilterCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filtros Avanzados</h4>
              <p className="text-sm text-muted-foreground">
                Ajusta los criterios para encontrar al profesional ideal.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="seniority" className="text-sm font-medium">Seniority</label>
                <Select value={seniority} onValueChange={setSeniority}>
                  <SelectTrigger id="seniority" className="col-span-2 h-8">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {SENIORITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="status" className="text-sm font-medium">Estado</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status" className="col-span-2 h-8">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button onClick={applyFilters} size="sm">
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Ordenar: un solo botón con 3 opciones */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-10" title={currentSortLabel()}>
            <ListFilter className="mr-2 h-4 w-4" />
            Ordenar
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <div className="grid gap-1">
            <Button variant="ghost" className="justify-start" onClick={() => applySortPreset('alpha')}>
              Alfabético (A→Z)
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => applySortPreset('seniority')}>
              Seniority
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => applySortPreset('createdAt')}>
              Fecha de creación
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}