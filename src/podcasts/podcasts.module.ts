import { Module } from "@nestjs/common";
import { PodcastsService } from "./podcasts.service";
import { EpisodeResolver, PodcastResolver } from "./podcasts.resolver";

@Module({
  providers: [PodcastsService, PodcastResolver, EpisodeResolver],
})
export class PodcastsModule {}
