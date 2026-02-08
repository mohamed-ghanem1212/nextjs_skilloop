import { statusEnum } from "./skills.types";

export interface Registeration {
  _id?: string;
  offerId: {
    id: string;
    wantSkill: string;
  };
  ownerId?: string;
  providerId?: {
    _id: string;
    username: string;
    profilePicture: string;
    title?: string;
  };
  status?: statusEnum.Open;
  description: string;
}
