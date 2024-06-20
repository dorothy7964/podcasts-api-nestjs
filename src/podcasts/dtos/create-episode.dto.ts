import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { Episode } from "../entities/episode.entity";
import { IsNumber } from "class-validator";

@InputType()
class CreateEpisodeInputType extends OmitType(Episode, ["id"]) {}

@InputType()
export class CreateEpisodeDto {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => CreateEpisodeInputType)
  episode: CreateEpisodeInputType;
}
