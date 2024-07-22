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
import { Role } from "src/auth/role.decorator";

@Resolver(() => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => [Podcast])
  @Role(["Any"])
  podcasts(): Promise<SearchPodcastOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation(() => CreatePodcastOutput)
  @Role(["HOST"])
  createPodcast(
    @Args("input") createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query(() => SearchPodcastOutput)
  @Role(["Any"])
  getPodcast(
    @Args() searchPodcastInput: SearchPodcastInput,
  ): Promise<SearchPodcastOutput> {
    return this.podcastsService.getPodcast(searchPodcastInput);
  }

  @Mutation(() => UpdatePodcastOutput)
  @Role(["HOST"])
  updatePodcast(
    @Args("input") updatePodcastInput: UpdatePodcastInput,
  ): Promise<UpdatePodcastOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }

  @Mutation(() => DeletePodcastOutput)
  @Role(["HOST"])
  deletePodcast(
    @Args() deletePodcastInput: DeletePodcastInput,
  ): Promise<DeletePodcastOutput> {
    return this.podcastsService.deletePodcast(deletePodcastInput);
  }
}
