import {
  GetOrderDetailsQuery,
  Product,
  SuppliersWithProductsQuery,
} from "../../generated/graphql-types.ts";

export const columns = [
  [
    {
      field: "orderReference",
      headerName: "Référence de commande",
      flex: 1,
      maxWidth: 250,
    },
    { field: "supplier", headerName: "Fournisseur", flex: 1, maxWidth: 250 },
    { field: "status", headerName: "Statut", flex: 1, maxWidth: 150 },
    { field: "products", headerName: "Produits", flex: 1 },
    { field: "created_at", headerName: "Création", flex: 1, maxWidth: 150 },
    {
      field: "total_quantity",
      headerName: "Quantité Totale",
      flex: 1,
      maxWidth: 150,
    },
    {
      field: "expectedDelivery",
      headerName: "Date de Livraison",
      flex: 1,
      maxWidth: 200,
    },
  ],
  [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   flex: 1,
    //   maxWidth: 75,
    // },
    {
      field: "product",
      headerName: "Nom du produit",
      flex: 1,
      maxWidth: 250,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      maxWidth: 350,
    },
    {
      field: "stock",
      headerName: "En stock",
      flex: 1,
      maxWidth: 100,
    },
  ],
];

export const dataGridOrdersFunction = (
  data: GetOrderDetailsQuery | undefined,
) => {
  return (
    data?.getOrderDetails?.map((order) => ({
      id: order.id,
      orderReference: order.id,
      supplier: order.products[0]?.supplierName,
      status: order.status.status,
      created_at: new Date(order.created_at).toLocaleDateString("fr-FR"), // Format date
      products: order.products.map((p) => p.productName).join(", "), // Combine product names
      total_quantity: order.products.reduce((sum, p) => sum + p.quantity, 0),
      expectedDelivery: new Date(
        Math.max(
          ...order.products.map((p) => new Date(p.expectedDelivery).getTime()),
        ),
      ).toLocaleDateString("fr-FR"), // Use the latest expected delivery date
    })) || []
  );
};

// Gère la récupération des produits d'un fournisseur pour le tableau
export const productsOfSupplier = (
  id: number,
  suppliersProducts: SuppliersWithProductsQuery,
): Product[] => {
  const supplier = suppliersProducts?.getAllSuppliersWithProducts?.find(
    (supplier) => supplier.id === id,
  );

  if (!supplier) {
    return [];
  }

  return supplier?.products?.map((product) => ({
    id: product.id,
    product: product.product,
    description: product.description,
    stock: product.stock,
  })) as Product[];
};
