import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import {
  CreateAccountInput,
  CreateAccountOutput,
} from "./dtos/create-account.dto";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => CreateAccountOutput)
  createAccount(@Args("input") createAccountInput: CreateAccountInput) {
    return this.userService.createAccount(createAccountInput);
  }
}
