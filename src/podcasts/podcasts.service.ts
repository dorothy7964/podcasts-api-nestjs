import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePodcastDto } from "./dtos/create-podcast.dto";
import { Podcast } from "./entities/podcasts.entity";
import { UpdatePodcastDto } from "./dtos/update-podcast.dto";
import { Episode } from "./entities/episode.entity";
import { CreateEpisodeDto } from "./dtos/create-episode.dto";
import { UpdateEpisodeDto } from "./dtos/update-episode.dto";
import { InfoEpisodeInput } from "./dtos/info-episode.dto ";

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];
  private episodes: Episode[] = [];

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

  getPodcast(id: number) {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with id ${id} not found`);
    }
    return podcast;
  }

  updatePodcast({ id, updateData }: UpdatePodcastDto): Podcast {
    const podcast = this.getPodcast(id);
    const updatedPodcast = { ...podcast, ...updateData };
    const index = this.podcasts.findIndex((p) => p.id === id);
    this.podcasts[index] = updatedPodcast;
    return updatedPodcast;
  }

  deletePodcast(id: number): boolean {
    const index = this.podcasts.findIndex((podcast) => podcast.id === id);
    if (index === -1) {
      return false;
      // throw new NotFoundException(`Podcast with id ${id} not found`);
    }
    this.podcasts.splice(index, 1);
    return true;
  }

  getEpisodes(podcastId: number): Episode[] {
    const podcast = this.getPodcast(podcastId);
    return podcast.episodes;
  }

  createEpisode({ podcastId, episode }: CreateEpisodeDto): Episode {
    const podcast = this.getPodcast(podcastId);
    const newEpisode: Episode = { id: Date.now(), ...episode };
    podcast.episodes.push(newEpisode);
    return newEpisode;
  }

  updateEpisode({ podcastId, episodeId, episode }: UpdateEpisodeDto): Episode {
    const podcast = this.getPodcast(podcastId);
    const episodeIndex = podcast.episodes.findIndex(
      (ep) => ep.id === episodeId,
    );
    if (episodeIndex === -1) {
      throw new NotFoundException(`Episode with id ${episodeId} not found`);
    }
    const updatedEpisode = { ...podcast.episodes[episodeIndex], ...episode };
    podcast.episodes[episodeIndex] = updatedEpisode;
    return updatedEpisode;
  }

  deleteEpisode(podcastId: number, episodeId: number): boolean {
    const podcast = this.getPodcast(podcastId);
    const episodeIndex = podcast.episodes.findIndex(
      (ep) => ep.id === episodeId,
    );
    if (episodeIndex === -1) {
      return false;
      // throw new NotFoundException(`Episode with id ${episodeId} not found`);
    }
    podcast.episodes.splice(episodeIndex, 1);
    return true;
  }
}
