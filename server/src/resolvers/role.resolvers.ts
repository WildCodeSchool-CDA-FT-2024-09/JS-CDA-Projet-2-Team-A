import { Query, Resolver } from "type-graphql";
import { Role } from "../entities/role.entities";
import { GraphQLError } from "graphql";

@Resolver(Role)
export default class RoleResolver {
  @Query(() => [Role])
  async getAllRoles(): Promise<Role[]> {
    try {
      return await Role.find();
    } catch {
      throw new GraphQLError("Failed to fetch roles. Please try again.");
    }
  }
}
