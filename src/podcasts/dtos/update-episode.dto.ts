import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";
import { CreateEpisodeInputType } from "./create-episode.dto";

@InputType()
class UpdateEpisodeInputType extends PartialType(CreateEpisodeInputType) {}

@InputType()
export class UpdateEpisodeInput {
  @Field(() => Number)
  @IsNumber()
  episodeId: number;

  @Field(() => UpdateEpisodeInputType)
  updateEpisode: UpdateEpisodeInputType;
}

@ObjectType()
export class UpdateEpisodeOutput extends PartialType(CoreOutput) {}
