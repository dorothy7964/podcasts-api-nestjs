import { InputType, OmitType } from "@nestjs/graphql";
import { Podcast } from "../entities/podcasts.entity";

@InputType()
export class CreatePodcastDto extends OmitType(Podcast, ["id", "episodes"]) {}
