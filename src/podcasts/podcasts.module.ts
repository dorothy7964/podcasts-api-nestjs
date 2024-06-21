import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Podcast } from "./entities/podcast.entity";
import { PodcastResolver } from "./podcasts.resolver";
import { PodcastsService } from "./podcasts.service";
import { Episode } from "src/episodess/entities/episode.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  providers: [PodcastsService, PodcastResolver],
  exports: [PodcastsService],
})
export class PodcastsModule {}
