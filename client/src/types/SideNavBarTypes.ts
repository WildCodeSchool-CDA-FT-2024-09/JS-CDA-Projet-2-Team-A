import { ReactElement } from "react";

export type SideNavBarPropsType = {
  teamLinks: linkType[];
  teamDashboardUrl: string;
};

export type linkType = {
  name: string;
  url: string;
  icon: ReactElement;
};
