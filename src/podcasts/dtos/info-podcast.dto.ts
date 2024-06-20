import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
@ArgsType()
export class InfoPodcastInput {
  @Field(() => Number)
  @IsNumber()
  podcastId: number;
}
