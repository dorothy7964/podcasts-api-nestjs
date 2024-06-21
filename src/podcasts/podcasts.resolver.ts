import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from "./dtos/create-podcast.dto";
import {
  SearchPodcastInput,
  SearchPodcastOutput,
} from "./dtos/search-podcast.dto";
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from "./dtos/update-podcast.dto";
import { Podcast } from "./entities/podcast.entity";
import { PodcastsService } from "./podcasts.service";
import { Episode } from "./entities/episode.entity";
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from "./dtos/create-episode.dto";
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from "./dtos/update-episode.dto";
import {
  SearchEpisodeInput,
  SearchEpisodeOutput,
} from "./dtos/search-episode.dto ";
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from "./dtos/delete-podcast.dto.";
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from "./dtos/delete-episode.dto ";

@Resolver(() => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => [Podcast])
  podcasts(): Promise<Podcast[]> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation(() => CreatePodcastOutput)
  createPodcast(
    @Args("input") createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query(() => SearchPodcastOutput)
  getPodcast(
    @Args() searchPodcastInput: SearchPodcastInput,
  ): Promise<SearchPodcastOutput> {
    return this.podcastsService.getPodcast(searchPodcastInput);
  }

  @Mutation(() => UpdatePodcastOutput)
  updatePodcast(
    @Args("input") updatePodcastInput: UpdatePodcastInput,
  ): Promise<UpdatePodcastOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }

  @Mutation(() => DeletePodcastOutput)
  deletePodcast(
    @Args() deletePodcastInput: DeletePodcastInput,
  ): Promise<DeletePodcastOutput> {
    return this.podcastsService.deletePodcast(deletePodcastInput);
  }
}

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Mutation(() => CreateEpisodeOutput)
  createEpisode(
    @Args("input") createPodcastInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.podcastsService.createEpisode(createPodcastInput);
  }

  @Query(() => SearchEpisodeOutput)
  getEpisodes(
    @Args() searchEpisodeInput: SearchEpisodeInput,
  ): Promise<SearchEpisodeOutput> {
    return this.podcastsService.getEpisodes(searchEpisodeInput);
  }

  @Mutation(() => UpdateEpisodeOutput)
  updateEpisode(@Args("input") updateEpisodeInput: UpdateEpisodeInput) {
    return this.podcastsService.updateEpisode(updateEpisodeInput);
  }

  @Mutation(() => DeleteEpisodeOutput)
  deleteEpisode(@Args() deleteEpisodeInput: DeleteEpisodeInput) {
    return this.podcastsService.deleteEpisode(deleteEpisodeInput);
  }
}
