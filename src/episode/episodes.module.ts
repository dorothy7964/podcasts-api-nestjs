import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Episode } from "./entities/episode.entity";
import { EpisodeResolver } from "./episodes.resolver";
import { EpisodesService } from "./episodes.service";
import { Podcast } from "src/podcast/entities/podcast.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode])],
  providers: [EpisodesService, EpisodeResolver],
  exports: [EpisodesService],
})
export class EpisodesModule {}
