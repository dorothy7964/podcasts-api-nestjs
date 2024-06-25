import { InternalServerErrorException } from "@nestjs/common";
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";

enum UserRole {
  HOST = "HOST",
  LISTENER = "LISTENER",
}

registerEnumType(UserRole, {
  name: "userRole",
  description:
    "Host = 유저는 Podcast를 만들어서 Episode를 업로드, LISTENER = 유저들이 팟캐스트를 구독하여 에피소드를 청취 가능 ",
});

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  email: string;

  @Column()
  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => UserRole)
  @Column({ type: "enum", enum: UserRole })
  @IsEnum(UserRole)
  @IsString()
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
