import { User } from "../entities/user.entities";
import { Resolver, Query } from "type-graphql";

@Resolver(User)
export default class UserResolver {
  @Query(() => [User], { nullable: true })
  async allUsers() {
    const users = await User.find();

    return users;
  }
}
