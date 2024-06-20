import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreatePodcastDto } from "./create-podcast.dto";
import { IsNumber } from "class-validator";

@InputType()
class UpdatePodcastInputType extends PartialType(CreatePodcastDto) {}

@InputType()
export class UpdatePodcastDto {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => UpdatePodcastInputType)
  updateData: UpdatePodcastInputType;
}
