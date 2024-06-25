import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import {
  CreateAccountInput,
  CreateAccountOutput,
} from "./dtos/create-account.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return {
          ok: false,
          error: "There is a user with that email already",
        };
      }
      const user = await this.users.create({ email, password, role });
      await this.users.save(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn`t create account" };
    }
  }
}
