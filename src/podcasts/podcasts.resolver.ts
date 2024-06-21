import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from "./dtos/create-podcast.dto";
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from "./dtos/delete-podcast.dto.";
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
