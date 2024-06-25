import { Field, registerEnumType } from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column } from "typeorm";

enum UserRole {
  HOST = "HOST",
  LISTENER = "LISTENER",
}

registerEnumType(UserRole, {
  name: "userRole",
  description:
    "Host = 유저는 Podcast를 만들어서 Episode를 업로드, LISTENER = 유저들이 팟캐스트를 구독하여 에피소드를 청취 가능 ",
});

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
}
