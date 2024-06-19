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

  @Get(":id")
  findOne(@Param("id") id: number): Podcast {
    return this.podcastsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updatePodcastDto: Partial<Podcast>,
  ): Podcast {
    return this.podcastsService.update(+id, updatePodcastDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number): void {
    return this.podcastsService.remove(+id);
  }
}