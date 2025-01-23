import { Authorized, Query, Resolver } from "type-graphql";
import { Supplier } from "../entities/supplier.entities";
import { GraphQLError } from "graphql/index";

@Authorized(["achat", "atelier"])
@Resolver(Supplier)
export default class SupplierResolver {
  @Query(() => [Supplier])
  async getAllSuppliersWithEmployees(): Promise<Supplier[]> {
    const suppliers: Supplier[] = await Supplier.find({
      relations: ["employees"],
    });
    if (!suppliers) {
      throw new GraphQLError(
        "Impossible de récupérer les fournisseurs. Merci de réessayer plus tard."
      );
    }
    return suppliers;
  }

  @Query(() => [Supplier])
  async getAllSuppliersWithProducts(): Promise<Supplier[]> {
    const suppliers: Supplier[] = await Supplier.find({
      relations: ["products"],
    });
    if (!suppliers) {
      throw new GraphQLError(
        "Impossible de récupérer les fournisseurs. Merci de réessayer plus tard."
      );
    }
    return suppliers;
  }

  @Query(() => [Supplier])
  async getSupplierName(): Promise<Supplier[]> {
    try {
      const suppliers: Supplier[] = await Supplier.find({
        select: ["id", "name"],
      });

      if (!suppliers || suppliers.length === 0) {
        throw new GraphQLError(
          "Aucun fournisseur trouvé. Merci de réessayer plus tard."
        );
      }

      return suppliers;
    } catch (error) {
      console.error("Erreur lors de la récupération des fournisseurs :", error);
      throw new GraphQLError(
        "une erreur est survenue lors de la récupération des fournisseurs."
      );
    }
  }
}
