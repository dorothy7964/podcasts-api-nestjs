import { Inject, Injectable } from "@nestjs/common";
import { CONFIG_OPTIONS } from "./jwt.constants";
import { JwtModuleOptions } from "./jwt.interfaces";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sing(userId: number): string {
    return jwt.sign({ id: userId }, this.options.privateKey);
  }
}
