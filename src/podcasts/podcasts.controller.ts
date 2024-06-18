import { Controller, Get } from "@nestjs/common";
import { Podcast } from "./entities/podcasts.entity";
import { PodcastsService } from "./podcasts.service";

@Controller("podcasts")
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  findAll(): Podcast[] {
    return this.podcastsService.findAll();
  }
}
