import { SECTION } from "./skillData.types";
import { SkillLvl, User } from "./user.types";

export interface SkillOfferT {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profilePicture: string;
    email: string;
  };
  wantSkill: string;
  level: SkillLvl;
  section: SECTION;
  description: string;
  status: statusEnum;
}

export enum statusEnum {
  Open = "Open",
  Matched = "Matched",
  Closed = "Closed",
}
