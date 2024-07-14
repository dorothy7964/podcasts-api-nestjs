import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Podcast } from "../entities/podcast.entity";

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
  "title",
  "category",
  "rating",
]) {}

@ObjectType()
export class CreatePodcastOutput extends PartialType(CoreOutput) {
  @Field(() => Int, { nullable: true })
  id?: number;
}
