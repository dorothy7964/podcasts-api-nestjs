import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Podcast } from "./entities/podcasts.entity";
import { PodcastsService } from "./podcasts.service";
import { Episode } from "./entities/episode.entity";
import { CreatePodcastDto } from "./dtos/create-podcast.dto";
import { CreateEpisodeDto } from "./dtos/create-episode.dto";
import { UpdatePodcastDto } from "./dtos/update-podcast.dto";
import { UpdateEpisodeDto } from "./dtos/update-episode.dto";

@Controller("podcasts")
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAllPodcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  @Post()
  createPodcast(@Body() createPodcastDto: CreatePodcastDto) {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Get(":id")
  getPodcast(@Param("id") id: number): Podcast {
    return this.podcastsService.getPodcast(+id);
  }

  @Patch(":id")
  updatePodcast(
    @Param("id") id: number,
    @Body() updatePodcastDto: UpdatePodcastDto,
  ): Podcast {
    return this.podcastsService.updatePodcast(+id, updatePodcastDto);
  }

  @Delete(":id")
  deletePodcast(@Param("id") id: number): void {
    return this.podcastsService.deletePodcast(+id);
  }

  @Get(":id/episodes")
  getEpisodes(@Param("id") id: number): Episode[] {
    return this.podcastsService.getEpisodes(+id);
  }

  @Post(":id/episodes")
  createEpisode(
    @Param("id") id: number,
    @Body() createEpisodeDto: CreateEpisodeDto,
  ): Episode {
    return this.podcastsService.createEpisode(+id, createEpisodeDto);
  }

  @Patch(":id/episodes/:episodeId")
  updateEpisode(
    @Param("id") id: number,
    @Param("episodeId") episodeId: number,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ): Episode {
    return this.podcastsService.updateEpisode(
      +id,
      +episodeId,
      updateEpisodeDto,
    );
  }

  @Delete(":id/episodes/:episodeId")
  deleteEpisode(
    @Param("id") id: number,
    @Param("episodeId") episodeId: number,
  ): void {
    return this.podcastsService.deleteEpisode(+id, +episodeId);
  }
}
