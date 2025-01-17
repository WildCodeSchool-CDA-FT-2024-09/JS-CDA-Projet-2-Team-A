import { Authorized, Query, Resolver } from "type-graphql";
import { Supplier } from "../entities/supplier.entities";
import { GraphQLError } from "graphql/index";

@Authorized(["achat"])
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
}
