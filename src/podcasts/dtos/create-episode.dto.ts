import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Episode } from "../entities/episode.entity";

@InputType()
export class CreateEpisodeInputType extends PickType(Episode, [
  "title",
  "description",
]) {}

@InputType()
export class CreateEpisodeInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => CreateEpisodeInputType)
  createEpisode: CreateEpisodeInputType;
}

@ObjectType()
export class CreateEpisodeOutput extends PartialType(CoreOutput) {}
