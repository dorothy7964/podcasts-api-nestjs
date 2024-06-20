import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
@ArgsType()
export class InfoPodcastInput {
  @Field(() => Number)
  podcastId: number;
}
