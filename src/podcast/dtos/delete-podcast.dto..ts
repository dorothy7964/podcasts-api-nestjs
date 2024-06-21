import { ArgsType, Field, ObjectType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@ArgsType()
export class DeletePodcastInput {
  @Field(() => Number)
  podcastId: number;
}

@ObjectType()
export class DeletePodcastOutput extends PartialType(CoreOutput) {}
