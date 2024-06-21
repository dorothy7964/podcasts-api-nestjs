import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from "./dtos/create-podcast.dto";
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from "./dtos/delete-podcast.dto.";
import {
  SearchPodcastInput,
  SearchPodcastOutput,
} from "./dtos/search-podcast.dto";
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from "./dtos/update-podcast.dto";
import { Podcast } from "./entities/podcast.entity";

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private readonly podcasts: Repository<Podcast>,
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
}
