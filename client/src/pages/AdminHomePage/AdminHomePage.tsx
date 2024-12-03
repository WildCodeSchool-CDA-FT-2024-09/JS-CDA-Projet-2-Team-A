import DashboardList from "../../components/DashboardList/DashboardList";

// TODO : import de fichiers json en attendant d'avoir la connexion à la BDD
import users from "../../../../server/data/mock/users.json";
import roles from "../../../../server/data/mock/roles.json";
import SideNavBar from "../../components/SideNavbar/SideNavBar.tsx";

const rolesName = new Map(roles.map((role) => [role.id, role.role]));
export default function AdminHomePage() {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nom", width: 250 },
    { field: "role", headerName: "Rôle", width: 250 },
    { field: "login", headerName: "Login", width: 250 },
  ];

  // TODO : Données à changer une fois la connexion à la BDD réalisée
  const data = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    role: rolesName.get(user.role),
    login: user.login,
  }));

  const title = "Liste des utilisateurs";

  return (
    <>
      {/*Rôle fournit en dur en attente du contexte*/}
      <SideNavBar role={"4"} />
      <DashboardList title={title} columns={columns} data={data} />
    </>
  );
}
