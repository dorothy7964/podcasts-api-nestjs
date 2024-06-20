import {
  ArgsType,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from "@nestjs/graphql";
import { Podcast } from "../entities/podcasts.entity";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType("searchPodcastInput", { isAbstract: true })
@ArgsType()
export class SearchPodcastInput extends PickType(Podcast, ["id"]) {}

@ObjectType()
export class SearchPodcastOutput extends PartialType(CoreOutput) {}
