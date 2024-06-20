import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePodcastDto } from "./dtos/create-podcast.dto";
import { InfoPodcastInput } from "./dtos/info-podcast.dto";
import { UpdatePodcastDto } from "./dtos/update-podcast.dto";
import { Podcast } from "./entities/podcasts.entity";
import { PodcastsService } from "./podcasts.service";
import { Episode } from "./entities/episode.entity";
import { CreateEpisodeDto } from "./dtos/create-episode.dto";
import { UpdateEpisodeDto } from "./dtos/update-episode.dto";
import { InfoEpisodeInput } from "./dtos/info-episode.dto ";

@Resolver(() => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => [Podcast])
  podcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation(() => Podcast)
  createPodcast(@Args("input") createPodcastDto: CreatePodcastDto) {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Query(() => Podcast)
  getPodcast(@Args() infoPodcastInput: InfoPodcastInput) {
    return this.podcastsService.getPodcast(infoPodcastInput.podcastId);
  }

  @Mutation(() => Podcast)
  updatePodcast(@Args("input") updatePodcastDto: UpdatePodcastDto) {
    return this.podcastsService.updatePodcast(updatePodcastDto);
  }

  @Mutation(() => Boolean)
  deletePodcast(@Args("input") { podcastId }: InfoPodcastInput) {
    return this.podcastsService.deletePodcast(podcastId);
  }
}

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Mutation(() => Episode)
  createEpisode(@Args("input") createEpisodeDto: CreateEpisodeDto) {
    return this.podcastsService.createEpisode(createEpisodeDto);
  }

  @Mutation(() => Episode)
  updateEpisode(@Args("input") updateEpisodeDto: UpdateEpisodeDto) {
    return this.podcastsService.updateEpisode(updateEpisodeDto);
  }

  @Mutation(() => Boolean)
  deleteEpisode(@Args("input") { podcastId, episodeId }: InfoEpisodeInput) {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }
}
