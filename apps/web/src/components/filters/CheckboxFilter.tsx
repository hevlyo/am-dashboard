import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { StudentStatus, STATUS_LABELS } from "@repo/schemas"

interface CheckboxFilterProps {
  value: StudentStatus[]
  onChange: (value: StudentStatus[]) => void
}

export function CheckboxFilter({ value, onChange }: CheckboxFilterProps) {
  const statuses = Object.keys(STATUS_LABELS) as StudentStatus[]

  const handleCheckedChange = (status: StudentStatus, checked: boolean) => {
    if (checked) {
      onChange([...value, status])
    } else {
      onChange(value.filter((s) => s !== status))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start text-muted-foreground hover:text-foreground">
          <Filter className="mr-2 h-4 w-4" />
          Status
          {value.length > 0 && (
            <>
              <div className="ml-2 h-4 w-[1px] bg-border" />
              <div className="ml-2 flex items-center justify-center rounded-sm bg-secondary px-1 text-xs font-normal text-secondary-foreground">
                {value.length}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="p-2 space-y-2">
          {statuses.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={value.includes(status)}
                onCheckedChange={(checked) =>
                  handleCheckedChange(status, checked as boolean)
                }
              />
              <Label htmlFor={`status-${status}`}>{STATUS_LABELS[status]}</Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
