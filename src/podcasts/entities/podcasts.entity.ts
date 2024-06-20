import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Episode } from "./episode.entity";
import { IsNumber, IsString } from "class-validator";

@InputType({ isAbstract: true })
@ObjectType()
export class Podcast {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  category: string;

  @Field(() => Number)
  @IsNumber()
  rating: number;

  @Field(() => [Episode])
  episodes: Episode[];
}
