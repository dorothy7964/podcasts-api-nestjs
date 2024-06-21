import { ArgsType, Field, ObjectType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Podcast } from "../entities/podcast.entity";

@ArgsType()
export class SearchPodcastInput {
  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class SearchPodcastOutput extends PartialType(CoreOutput) {
  @Field(() => Podcast, { nullable: true })
  podcast?: Podcast;
}
