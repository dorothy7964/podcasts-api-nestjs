import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, isString } from "class-validator";

@InputType("EpisodeInput", { isAbstract: true })
@ObjectType()
export class Episode {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field()
  @IsNumber()
  title: string;

  @Field()
  @IsString()
  description: string;
}
