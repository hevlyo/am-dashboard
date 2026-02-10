import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

interface MultiSelectFilterProps {
  title: string;
  options: FilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelectFilter({ title, options, value, onChange }: MultiSelectFilterProps) {
  const handleCheckedChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn(
          "justify-start hover:text-foreground max-w-[200px]",
          value.length > 0 ? "text-foreground bg-accent/50" : "text-muted-foreground"
        )}>
          <Filter className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{title}</span>
          {value.length > 0 && (
            <>
              <div className="ml-2 h-4 w-[1px] bg-border shrink-0" />
              <div className="ml-2 flex items-center justify-center rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary shrink-0">
                {value.length}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="p-2 space-y-2 max-h-[300px] overflow-y-auto">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${title}-${option.value}`}
                checked={value.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckedChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`${title}-${option.value}`} className="flex-1 cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
