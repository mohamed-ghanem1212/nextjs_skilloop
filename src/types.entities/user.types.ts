export interface User {
  _id?: string;
  username: string;
  email: string;
  title: string;
  password: string;
  bio: string;
  profilePicture: string;

  role?: string;
}
export enum SkillLvl {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}
