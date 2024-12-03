import SideNavBar from "../../components/SideNavbar/SideNavBar";
import DashboardList from "../../components/DashboardList/DashboardList";
import Box from "@mui/material/Box";

// TODO : import de fichiers json en attendant d'avoir la connexion à la BDD
import products from "../../../../server/data/mock/products.json";

export default function InventroyPage() {
  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "category", headerName: "Catégorie", width: 200 },
    { field: "product", headerName: "Produit", width: 200 },
    { field: "material", headerName: "Matériau", width: 150 },
    { field: "color", headerName: "Couleur", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "minimal", headerName: "Seuil", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "status", headerName: "Etat", width: 200 },
    { field: "supplier", headerName: "Fournisseur", width: 200 },
  ];

  // TODO : Données à changer une fois la connexion à la BDD réalisée
  const data = products.map((product, index) => ({
    id: index + 1,
    product: product.product,
    material: product.material,
    color: product.color,
    category: product.category,
    description: product.description,
    stock: product.stock,
    supplier: product.supplier,
  }));

  const title = "Liste des produits";

  return (
    <>
      <SideNavBar />
      <Box
        sx={{
          marginLeft: "13dvw",
          padding: "10px",
        }}
      >
        <DashboardList title={title} columns={columns} data={data} />
      </Box>
    </>
  );
}
