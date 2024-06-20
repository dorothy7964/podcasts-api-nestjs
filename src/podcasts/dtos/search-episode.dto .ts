import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  PartialType,
} from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType("searchEpisodeInput", { isAbstract: true })
@ArgsType()
export class SearchEpisodeInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => Number)
  @IsNumber()
  episodeId: number;
}

@ObjectType()
export class SearchEpisodeOutput extends PartialType(CoreOutput) {}
