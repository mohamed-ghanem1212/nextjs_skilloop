import Development from "./Development";
import Creativity from "./Creativity";
import Marketing from "./Marketing";
import Business from "./Business";
import OtherSkills from "./OtherSkills";
import { JSX } from "react";

export const skillConfig: Record<string, { component: () => JSX.Element }> = {
  development: {
    component: Development,
  },
  design: {
    component: Creativity,
  },
  marketing: {
    component: Marketing,
  },
  business: {
    component: Business,
  },
  other: {
    component: OtherSkills,
  },
};
