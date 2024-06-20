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
class UpdateEpisodeInputType extends OmitType(Episode, ["id"]) {}

@InputType()
export class UpdateEpisodeInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => Number)
  @IsNumber()
  episodeId: number;

  @Field(() => UpdateEpisodeInputType)
  episode: UpdateEpisodeInputType;
}

@ObjectType()
export class UpdateEpisodeOutput extends PartialType(CoreOutput) {}
