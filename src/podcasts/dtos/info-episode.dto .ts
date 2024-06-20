import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType("infoEpisodeInput", { isAbstract: true })
@ArgsType()
export class InfoEpisodeInput {
  @Field(() => Number)
  podcastId: number;

  @Field(() => Number)
  episodeId: number;
}
