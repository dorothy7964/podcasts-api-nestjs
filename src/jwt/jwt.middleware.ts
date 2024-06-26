import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { JwtService } from "./jwt.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ("x-jwt" in req.headers) {
      // 토큰 가져오기
      const token = req.headers["x-jwt"];

      try {
        // 올바른 토큰인지 확인
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
          const user = await this.usersService.findById(decoded["id"]);
          req["user"] = user;
        }
      } catch (error) {
        console.log(error);
      }
    }
    next();
  }
}
