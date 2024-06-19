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

@Controller("podcasts")
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAllPodcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  @Post()
  // @Body() 데코레이터는 요청의 본문(body)에서 데이터를 추출
  createPodcast(
    @Body() createPodcastDto: Omit<Podcast, "id" | "episodes">,
  ): Podcast {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Get(":id")
  getPodcast(@Param("id") id: number): Podcast {
    return this.podcastsService.getPodcast(+id);
  }

  @Patch(":id")
  updatePodcast(
    @Param("id") id: number,
    @Body() updatePodcastDto: Partial<Podcast>,
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
    @Body() createEpisodeDto: Omit<Episode, "id">,
  ): Episode {
    return this.podcastsService.createEpisode(+id, createEpisodeDto);
  }

  @Patch(":id/episodes/:episodeId")
  updateEpisode(
    @Param("id") id: number,
    @Param("episodeId") episodeId: number,
    @Body() updateEpisodeDto: Partial<Episode>,
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
