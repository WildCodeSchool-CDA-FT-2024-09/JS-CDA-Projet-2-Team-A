import { ReactElement } from "react";

export type linkType = {
  name: string;
  url: string;
  icon: ReactElement;
  role: string[];
};

export type linkTypeOpt = {
  name: string;
  url?: string;
  icon: ReactElement;
};
