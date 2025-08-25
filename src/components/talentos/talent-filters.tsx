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
import { Card, CardContent } from "@/components/ui/card";
import { SearchIcon, FilterIcon, XCircleIcon } from "lucide-react";
import { SENIORITY_OPTIONS, STATUS_OPTIONS } from "@/constants/talentEnums";

interface TalentFiltersProps {
  initialFilters?: {
    search?: string;
    seniority?: string;
    status?: string;
  };
}

export function TalentFilters({ initialFilters = {} }: TalentFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [search, setSearch] = useState(initialFilters.search || "");
  const [seniority, setSeniority] = useState(initialFilters.seniority || "all");
  const [status, setStatus] = useState(initialFilters.status || "all");
  
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (search.trim()) params.append("search", search.trim());
    if (seniority !== "all") params.append("seniority", seniority);
    if (status !== "all") params.append("status", status);
    
    params.append("page", "1");
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const clearFilters = () => {
    setSearch("");
    setSeniority("all");
    setStatus("all");
    router.push(pathname);
  };
  
  const hasActiveFilters = search.trim() || seniority !== "all" || status !== "all";
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Input
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-8"
            />
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select value={seniority} onValueChange={setSeniority}>
            <SelectTrigger>
              <SelectValue placeholder="Seniority" />
            </SelectTrigger>
            <SelectContent>
              {SENIORITY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button 
              variant="default" 
              onClick={applyFilters}
              className="flex-1"
            >
              <FilterIcon className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={clearFilters}
              >
                <XCircleIcon className="h-4 w-4" />
                <span className="sr-only">Limpiar filtros</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}