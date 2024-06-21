import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from "./dtos/create-episode.dto";
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from "./dtos/delete-episode.dto ";
import {
  SearchEpisodeInput,
  SearchEpisodeOutput,
} from "./dtos/search-episode.dto ";
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from "./dtos/update-episode.dto";
import { Episode } from "./entities/episode.entity";
import { EpisodesService } from "./episodes.service";

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private readonly episodesService: EpisodesService) {}

  @Mutation(() => CreateEpisodeOutput)
  createEpisode(
    @Args("input") createPodcastInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.episodesService.createEpisode(createPodcastInput);
  }

  @Query(() => SearchEpisodeOutput)
  getEpisodes(
    @Args() searchEpisodeInput: SearchEpisodeInput,
  ): Promise<SearchEpisodeOutput> {
    return this.episodesService.getEpisodes(searchEpisodeInput);
  }

  @Mutation(() => UpdateEpisodeOutput)
  updateEpisode(@Args("input") updateEpisodeInput: UpdateEpisodeInput) {
    return this.episodesService.updateEpisode(updateEpisodeInput);
  }

  @Mutation(() => DeleteEpisodeOutput)
  deleteEpisode(@Args() deleteEpisodeInput: DeleteEpisodeInput) {
    return this.episodesService.deleteEpisode(deleteEpisodeInput);
  }
}
