import { SkillLvl } from "./user.types";

export interface Skill {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  skill: string;
  image: string;
  level: SkillLvl | null;
  description: string;
  section: SECTION | null;
}

export enum SECTION {
  DEVELOPMENT = "Development",
  ART_DESIGN = "Art_Design",
  BUSINESS = "Business",
  MARKETING = "Marketing",
  OTHER = "Other",
}
