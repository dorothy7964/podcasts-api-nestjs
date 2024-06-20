import { InputType, ObjectType, OmitType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Podcast } from "../entities/podcasts.entity";

@InputType()
export class CreatePodcastInput extends OmitType(Podcast, ["id", "episodes"]) {}

@ObjectType()
export class CreatePodcastOutput extends PartialType(CoreOutput) {}
