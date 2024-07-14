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
      // 입력 데이터 유효성 검사
      if (!podcast.title || !podcast.category) {
        return { ok: false, error: "Title and category are required." };
      }

      // 새로운 팟캐스트 객체 생성
      const newPodcast = this.podcasts.create({
        ...podcast,
        episodes: [],
      });

      // 데이터베이스에 팟캐스트 저장
      const savedPodcast = await this.podcasts.save(newPodcast);

      // 성공적으로 저장된 경우
      return { ok: true, id: savedPodcast.id };
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
