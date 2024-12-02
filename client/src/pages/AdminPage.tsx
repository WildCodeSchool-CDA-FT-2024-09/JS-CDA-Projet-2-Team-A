import { ReactElement } from "react";
import SideNavBar from "../components/SideNavBar.tsx";
import { adminLinks } from "../assets/SideNavBarLinks/AdminLinks.tsx";

export default function AdminPage(): ReactElement {
  return <SideNavBar teamLinks={adminLinks} teamDashboardUrl={"admin"} />;
}
