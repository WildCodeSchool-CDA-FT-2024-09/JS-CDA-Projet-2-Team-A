import { ReactElement } from "react";
import SideNavBar from "../components/SideNavBar.tsx";
import { allLinks } from "../links/SideNavBarLinks/allLinks.tsx";

export default function AdminPage(): ReactElement {
  return <SideNavBar teamLinks={allLinks.admin} teamDashboardUrl={"admin"} />;
}
