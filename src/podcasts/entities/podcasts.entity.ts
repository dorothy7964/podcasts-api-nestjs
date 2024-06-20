import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Episode } from "./episode.entity";
import { IsNumber, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";

@InputType({ isAbstract: true })
@ObjectType()
export class Podcast extends CoreEntity {
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
