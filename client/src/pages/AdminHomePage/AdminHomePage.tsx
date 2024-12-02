import DashboardList from "../../components/DashboardList/DashboardList";

// TODO : import de fichiers json en attendant d'avoir la connexion à la BDD
import users from "../../../../server/data/data/mock/users.json";
import roles from "../../../../server/data/data/mock/roles.json";

export default function AdminHomePage() {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nom", width: 250 },
    { field: "role", headerName: "Rôle", width: 250 },
    { field: "login", headerName: "Login", width: 250 },
  ];

  const rolesName = new Map(roles.map((role) => [role.id, role.role]));

  const data = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    role: rolesName.get(user.role),
    login: user.login,
  }));

  const title = "Liste des utilisateurs";

  return (
    <>
      <DashboardList title={title} columns={columns} data={data} />
    </>
  );
}
