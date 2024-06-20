import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { CreatePodcastInput } from "./create-podcast.dto";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
class UpdatePodcastInputType extends PartialType(CreatePodcastInput) {}

@InputType()
export class UpdatePodcastInput {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => UpdatePodcastInputType)
  updateData: UpdatePodcastInputType;
}

@ObjectType()
export class UpdatePodcastOutput extends PartialType(CoreOutput) {}
