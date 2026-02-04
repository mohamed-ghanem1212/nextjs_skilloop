import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent } from "react";
import { SkillLvl } from "../../../.next/dev/types/user.types";
import { SECTION } from "../../../.next/dev/types/skillData.types";
type SelectOption<T extends string> = {
  label: string;
  value: T;
};
type SelectSectionProps<T extends string> = {
  values: readonly SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
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
export function SelectSection<T extends string>({
  values,
  value,
  onChange,
}: SelectSectionProps<T>) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your choice" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {values.map((item) => (
            <SelectItem key={item.value} value={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
