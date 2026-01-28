import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, CATEGORY_LABELS } from "@repo/schemas";

interface SelectFilterProps {
  value: Category[];
  onChange: (value: Category[]) => void;
}

export function SelectFilter({ value, onChange }: SelectFilterProps) {
  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  return (
    <Select
      value={value[0] || ""}
      onValueChange={(val) => onChange(val ? [val as Category] : [])}
    >
      <SelectTrigger className="w-[200px]" aria-label="Categoria do curso">
        <SelectValue placeholder="Categoria do Curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas as Categorias</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {CATEGORY_LABELS[category]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
