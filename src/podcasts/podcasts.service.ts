import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from "./dtos/create-episode.dto";
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from "./dtos/create-podcast.dto";
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from "./dtos/delete-episode.dto ";
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from "./dtos/delete-podcast.dto.";
import {
  SearchEpisodeInput,
  SearchEpisodeOutput,
} from "./dtos/search-episode.dto ";
import {
  SearchPodcastInput,
  SearchPodcastOutput,
} from "./dtos/search-podcast.dto";
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from "./dtos/update-episode.dto";
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from "./dtos/update-podcast.dto";
import { Episode } from "./entities/episode.entity";
import { Podcast } from "./entities/podcast.entity";

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private readonly podcasts: Repository<Podcast>,
    @InjectRepository(Episode) private readonly episodes: Repository<Episode>,
  ) {}

  getAllPodcasts(): Promise<Podcast[]> {
    return this.podcasts.find();
  }

  async createPodcast(
    podcast: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    try {
      const newPodcast = {
        ...podcast,
        episodes: [],
      };
      await this.podcasts.save(newPodcast);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn`t create podcast" };
    }
  }

  async getPodcast({
    podcastId,
  }: SearchPodcastInput): Promise<SearchPodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne({ where: { id: podcastId } });
      if (!podcast) {
        return { ok: false, error: "Podcast Not Found" };
      }
      return {
        ok: true,
        podcast,
      };
    } catch (error) {
      return { ok: false, error: "Could not get podcast." };
    }
  }

  async updatePodcast({
    podcastId,
    updateData,
  }: UpdatePodcastInput): Promise<UpdatePodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne({ where: { id: podcastId } });
      if (!podcast) {
        return { ok: false, error: "Podcast Not Found" };
      }
      await this.podcasts.update(podcastId, { ...updateData });

      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "Could not update podcast." };
    }
  }

  async deletePodcast({
    podcastId,
  }: DeletePodcastInput): Promise<DeletePodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne({ where: { id: podcastId } });
      if (!podcast) {
        return { ok: false, error: "Podcast Not Found" };
      }
      await this.podcasts.delete(podcastId);
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "Could not delete podcast." };
    }
  }

  async createEpisode({
    podcastId,
    createEpisode,
  }: CreateEpisodeInput): Promise<CreateEpisodeOutput> {
    try {
      const podcast = await this.podcasts.findOne({ where: { id: podcastId } });
      if (!podcast) {
        return { ok: false, error: "Podcast Not Found" };
      }
      const newEpisode = this.episodes.create({
        ...createEpisode,
        podcast,
      });
      await this.episodes.save(newEpisode);

      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "Could not create episode." };
    }
  }

  async getEpisodes({
    podcastId,
  }: SearchEpisodeInput): Promise<SearchEpisodeOutput> {
    try {
      const episode = await this.episodes.find({
        where: { podcast: { id: podcastId } },
      });
      if (!episode) {
        return { ok: false, error: "Episode Not Found" };
      }
      return {
        ok: true,
        episode,
      };
    } catch (error) {
      return { ok: false, error: "Could not get episode." };
    }
  }

  async updateEpisode({
    episodeId,
    updateEpisode,
  }: UpdateEpisodeInput): Promise<UpdateEpisodeOutput> {
    try {
      const episode = await this.episodes.findOne({
        where: { id: episodeId },
      });
      if (!episode) {
        return { ok: false, error: "Episode Not Found" };
      }

      await this.episodes.update(episodeId, { ...updateEpisode });

      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "Could not update episode." };
    }
  }

  async deleteEpisode({
    episodeId,
  }: DeleteEpisodeInput): Promise<DeleteEpisodeOutput> {
    try {
      const episode = await this.episodes.findOne({ where: { id: episodeId } });
      if (!episode) {
        return { ok: false, error: "Episode Not Found" };
      }
      await this.episodes.delete(episodeId);
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "Could not delete episode." };
    }
  }
}
