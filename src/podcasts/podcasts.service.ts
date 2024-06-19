import { Injectable, NotFoundException } from "@nestjs/common";
import { Podcast } from "./entities/podcasts.entity";
import { Episode } from "./entities/episode.entity";

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];
  private idCounter = 1;
  private episodeIdCounter = 1;

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

  findEpisodes(podcastId: number): Episode[] {
    const podcast = this.findOne(podcastId);
    return podcast.episodes;
  }

  addEpisode(podcastId: number, episode: Omit<Episode, "id">): Episode {
    const podcast = this.findOne(podcastId);
    const newEpisode: Episode = { id: this.episodeIdCounter++, ...episode };
    podcast.episodes.push(newEpisode);
    return newEpisode;
  }

  updateEpisode(
    podcastId: number,
    episodeId: number,
    updateData: Partial<Episode>,
  ): Episode {
    const podcast = this.findOne(podcastId);
    const episodeIndex = podcast.episodes.findIndex(
      (ep) => ep.id === episodeId,
    );
    if (episodeIndex === -1) {
      throw new NotFoundException(`Episode with id ${episodeId} not found`);
    }
    const updatedEpisode = { ...podcast.episodes[episodeIndex], ...updateData };
    podcast.episodes[episodeIndex] = updatedEpisode;
    return updatedEpisode;
  }

  removeEpisode(podcastId: number, episodeId: number): void {
    const podcast = this.findOne(podcastId);
    const episodeIndex = podcast.episodes.findIndex(
      (ep) => ep.id === episodeId,
    );
    if (episodeIndex === -1) {
      throw new NotFoundException(`Episode with id ${episodeId} not found`);
    }
    podcast.episodes.splice(episodeIndex, 1);
  }
}
