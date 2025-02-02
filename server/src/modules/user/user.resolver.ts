import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@modules/user/dto/user.model";
import { UserService } from "@modules/user/user.service";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { nullable: true })
  async getUserTree() {
    return this.userService.getTree();
  }

  @Mutation(() => User)
  async createUser(
    @Args("firstName") firstName: string,
    @Args("lastName") lastName: string,
    @Args("managerId") managerId: number,
  ) {
    return this.userService.create(firstName, lastName, managerId);
  }

  @Mutation(() => [User])
  async changeManager(
    @Args("userId") userId: number,
    @Args("managerId") managerId: number,
  ) {
    return this.userService.changeManager(userId, managerId);
  }

  @Mutation(() => [User])
  async removeUser(@Args("id") id: number) {
    return this.userService.remove(id);
  }
}
