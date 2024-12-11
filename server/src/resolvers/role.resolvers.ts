import { Query, Resolver } from "type-graphql";
import { Role } from "../entities/role.entities";

@Resolver(Role)
export class RoleResolver {
  @Query(() => [Role])
  async getAllRoles(): Promise<Role[]> {
    try {
      return await Role.find();
    } catch {
      throw new Error("Failed to fetch roles. Please try again.");
    }
  }
}
