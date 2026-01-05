import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Key = {
  label: string;
  value: string;
};
type SelectSectionProps = {
  values: Key[];
};
export const lvl = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];
export const sections = [
  { label: "Development", value: "development" },
  { label: "Art & Design", value: "art" },
  { label: "Marketing", value: "marketing" },
  { label: "Business", value: "business" },
  { label: "Other", value: "other" },
];
export function SelectSection({ values }: SelectSectionProps) {
  return (
    <Select>
      <SelectTrigger className="w-96">
        <SelectValue placeholder="Select your choice" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values.map((value) => (
            <SelectItem value={value.value} key={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
