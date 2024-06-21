import { ArgsType, Field, ObjectType, PartialType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";

@ArgsType()
export class DeleteEpisodeInput {
  @Field(() => Number)
  @IsNumber()
  episodeId: number;
}

@ObjectType()
export class DeleteEpisodeOutput extends PartialType(CoreOutput) {}
