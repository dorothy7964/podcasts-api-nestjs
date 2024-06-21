import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";
import { CreatePodcastInput } from "./create-podcast.dto";

@InputType()
class UpdatePodcastInputType extends PartialType(CreatePodcastInput) {}

@InputType()
export class UpdatePodcastInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => UpdatePodcastInputType)
  updateData: UpdatePodcastInputType;
}

@ObjectType()
export class UpdatePodcastOutput extends PartialType(CoreOutput) {}
