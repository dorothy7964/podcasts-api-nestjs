import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { Episode } from "../entities/episode.entity";
import { IsNumber } from "class-validator";

@InputType()
class UpdateEpisodeInputType extends OmitType(Episode, ["id"]) {}

@InputType()
export class UpdateEpisodeDto {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => Number)
  @IsNumber()
  episodeId: number;

  @Field(() => UpdateEpisodeInputType)
  episode: UpdateEpisodeInputType;
}
