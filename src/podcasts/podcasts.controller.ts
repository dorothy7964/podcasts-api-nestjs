import { Body, Controller, Get, Post } from "@nestjs/common";
import { Podcast } from "./entities/podcasts.entity";
import { PodcastsService } from "./podcasts.service";

@Controller("podcasts")
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  findAll(): Podcast[] {
    return this.podcastsService.findAll();
  }

  @Post()
  // @Body() 데코레이터는 요청의 본문(body)에서 데이터를 추출
  create(@Body() createPodcastDto: Omit<Podcast, "id" | "episodes">): Podcast {
    return this.podcastsService.create(createPodcastDto);
  }
}
