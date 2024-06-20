import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";

@InputType("EpisodeInput", { isAbstract: true })
@ObjectType()
export class Episode extends CoreEntity {
  @Field()
  @IsNumber()
  title: string;

  @Field()
  @IsString()
  description: string;
}
