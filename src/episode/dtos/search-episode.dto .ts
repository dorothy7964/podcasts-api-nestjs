import { ArgsType, Field, ObjectType, PartialType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Episode } from "../entities/episode.entity";

@ArgsType()
export class SearchEpisodeInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;
}

@ObjectType()
export class SearchEpisodeOutput extends PartialType(CoreOutput) {
  @Field(() => [Episode], { nullable: true })
  episode?: Episode[];
}
