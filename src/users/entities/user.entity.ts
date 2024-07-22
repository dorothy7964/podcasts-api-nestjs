import { InternalServerErrorException } from "@nestjs/common";
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";

export enum UserRole {
  HOST = "HOST",
  LISTENER = "LISTENER",
}

registerEnumType(UserRole, {
  name: "userRole",
  description:
    "Host = 유저는 Podcast를 만들어서 Episode를 업로드, LISTENER = 유저들이 팟캐스트를 구독하여 에피소드를 청취 가능 ",
});

@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  email: string;

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => UserRole)
  @Column({ type: "enum", enum: UserRole })
  @IsEnum(UserRole)
  @IsString()
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
