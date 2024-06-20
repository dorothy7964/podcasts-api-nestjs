import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from "@nestjs/graphql";
import { Episode } from "../entities/episode.entity";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
class CreateEpisodeInputType extends OmitType(Episode, ["id"]) {}

@InputType()
export class CreateEpisodeInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => CreateEpisodeInputType)
  episode: CreateEpisodeInputType;
}

@ObjectType()
export class CreateEpisodeOutput extends PartialType(CoreOutput) {}
