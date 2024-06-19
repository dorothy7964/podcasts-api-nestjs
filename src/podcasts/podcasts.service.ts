import { Injectable, NotFoundException } from "@nestjs/common";
import { Podcast } from "./entities/podcasts.entity";
import { Episode } from "./entities/episode.entity";
import { CreatePodcastDto } from "./dtos/create-podcast.dto";
import { UpdatePodcastDto } from "./dtos/update-podcast.dto";
import { CreateEpisodeDto } from "./dtos/create-episode.dto";
import { UpdateEpisodeDto } from "./dtos/update-episode.dto";

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  createPodcast(podcast: CreatePodcastDto): Podcast {
    const newPodcast: Podcast = {
      id: Date.now(),
      ...podcast,
      episodes: [],
    };
    this.podcasts.push(newPodcast);
    return newPodcast;
  }

  getPodcast(id: number): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with id ${id} not found`);
    }
    return podcast;
  }

  updatePodcast(id: number, updateData: UpdatePodcastDto): Podcast {
    const podcast = this.getPodcast(id);
    const updatedPodcast = { ...podcast, ...updateData };
    const index = this.podcasts.findIndex((p) => p.id === id);
    this.podcasts[index] = updatedPodcast;
    return updatedPodcast;
  }

  deletePodcast(id: number): void {
    const index = this.podcasts.findIndex((podcast) => podcast.id === id);
    if (index === -1) {
      throw new NotFoundException(`Podcast with id ${id} not found`);
    }
    this.podcasts.splice(index, 1);
  }

  getEpisodes(podcastId: number): Episode[] {
    const podcast = this.getPodcast(podcastId);
    return podcast.episodes;
  }

  createEpisode(podcastId: number, episode: CreateEpisodeDto): Episode {
    const podcast = this.getPodcast(podcastId);
    const newEpisode: Episode = { id: Date.now(), ...episode };
    podcast.episodes.push(newEpisode);
    return newEpisode;
  }

  updateEpisode(
    podcastId: number,
    episodeId: number,
    updateData: UpdateEpisodeDto,
  ): Episode {
    const podcast = this.getPodcast(podcastId);
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

  deleteEpisode(podcastId: number, episodeId: number): void {
    const podcast = this.getPodcast(podcastId);
    const episodeIndex = podcast.episodes.findIndex(
      (ep) => ep.id === episodeId,
    );
    if (episodeIndex === -1) {
      throw new NotFoundException(`Episode with id ${episodeId} not found`);
    }
    podcast.episodes.splice(episodeIndex, 1);
  }
}
