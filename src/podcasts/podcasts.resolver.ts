import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePodcastInput } from "./dtos/create-podcast.dto";
import { SearchPodcastInput } from "./dtos/search-podcast.dto";
import { UpdatePodcastInput } from "./dtos/update-podcast.dto";
import { Podcast } from "./entities/podcasts.entity";
import { PodcastsService } from "./podcasts.service";
import { Episode } from "./entities/episode.entity";
import { CreateEpisodeInput } from "./dtos/create-episode.dto";
import { UpdateEpisodeInput } from "./dtos/update-episode.dto";
import { SearchEpisodeInput } from "./dtos/search-episode.dto ";

@Resolver(() => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => [Podcast])
  podcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation(() => Podcast)
  createPodcast(@Args("input") CreatePodcastInput: CreatePodcastInput) {
    return this.podcastsService.createPodcast(CreatePodcastInput);
  }

  @Query(() => Podcast)
  getPodcast(@Args() { id }: SearchPodcastInput) {
    return this.podcastsService.getPodcast(id);
  }

  @Mutation(() => Podcast)
  updatePodcast(@Args("input") UpdatePodcastInput: UpdatePodcastInput) {
    return this.podcastsService.updatePodcast(UpdatePodcastInput);
  }

  @Mutation(() => Boolean)
  deletePodcast(@Args("input") { id }: SearchPodcastInput) {
    return this.podcastsService.deletePodcast(id);
  }
}

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Mutation(() => Episode)
  createEpisode(@Args("input") CreateEpisodeInput: CreateEpisodeInput) {
    return this.podcastsService.createEpisode(CreateEpisodeInput);
  }

  @Mutation(() => Episode)
  updateEpisode(@Args("input") UpdateEpisodeInput: UpdateEpisodeInput) {
    return this.podcastsService.updateEpisode(UpdateEpisodeInput);
  }

  @Mutation(() => Boolean)
  deleteEpisode(@Args("input") { podcastId, episodeId }: SearchEpisodeInput) {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }
}
