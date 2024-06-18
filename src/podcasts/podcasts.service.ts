import { Injectable } from "@nestjs/common";
import { Podcast } from "./entities/podcasts.entity";

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  findAll(): Podcast[] {
    return this.podcasts;
  }
}
