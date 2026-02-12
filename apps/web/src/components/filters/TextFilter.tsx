import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TextFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextFilter({ value, onChange }: TextFilterProps) {
  return (
    <div className="relative w-full md:w-[240px]">
      <label htmlFor="search" className="sr-only">
        Buscar aluno
      </label>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        id="search"
        placeholder="Buscar por nome do aluno..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
