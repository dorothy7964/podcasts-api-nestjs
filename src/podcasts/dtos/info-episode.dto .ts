import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType("infoEpisodeInput", { isAbstract: true })
@ArgsType()
export class InfoEpisodeInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;

  @Field(() => Number)
  @IsNumber()
  episodeId: number;
}
