import { Injectable, NotFoundException } from "@nestjs/common";
import { Podcast } from "./entities/podcasts.entity";

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];
  private idCounter = 1;

  findAll(): Podcast[] {
    return this.podcasts;
  }

  create(podcast: Omit<Podcast, "id" | "episodes">): Podcast {
    const newPodcast: Podcast = {
      id: this.idCounter++,
      ...podcast,
      episodes: [],
    };
    this.podcasts.push(newPodcast);
    return newPodcast;
  }

  findOne(id: number): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with id ${id} not found`);
    }
    return podcast;
  }

  update(id: number, updateData: Partial<Podcast>): Podcast {
    const podcast = this.findOne(id);
    const updatedPodcast = { ...podcast, ...updateData };
    const index = this.podcasts.findIndex((p) => p.id === id);
    this.podcasts[index] = updatedPodcast;
    return updatedPodcast;
  }

  remove(id: number): void {
    const index = this.podcasts.findIndex((podcast) => podcast.id === id);
    if (index === -1) {
      throw new NotFoundException(`Podcast with id ${id} not found`);
    }
    this.podcasts.splice(index, 1);
  }
}
