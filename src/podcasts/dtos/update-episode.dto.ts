import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { Episode } from "../entities/episode.entity";

@InputType()
class UpdateEpisodeInputType extends OmitType(Episode, ["id"]) {}

@InputType()
export class UpdateEpisodeDto {
  @Field(() => Number)
  podcastId: number;

  @Field(() => Number)
  episodeId: number;

  @Field(() => UpdateEpisodeInputType)
  episode: UpdateEpisodeInputType;
}
