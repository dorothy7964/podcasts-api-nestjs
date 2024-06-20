import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { Episode } from "../entities/episode.entity";

@InputType()
class CreateEpisodeInputType extends OmitType(Episode, ["id"]) {}

@InputType()
export class CreateEpisodeDto {
  @Field(() => Number)
  podcastId: number;

  @Field(() => CreateEpisodeInputType)
  episode: CreateEpisodeInputType;
}
