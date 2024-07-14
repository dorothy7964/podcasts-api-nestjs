import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Episode } from "src/episode/entities/episode.entity";
import { Podcast } from "src/podcast/entities/podcast.entity";
import { Repository } from "typeorm";
import { EpisodesService } from "./episodes.service";

export type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

// const mockPodcastService = new PodcastsService();
// mockPodcastService.getPodcast = jest.fn();

const TEST_PODCAST: Podcast = {
  id: 1,
  title: "TEST PODCAST",
  category: "TEST PODCAST",
  rating: 0,
  episodes: [],
  createAt: new Date(),
  updateAt: new Date(),
};

const TEST_EPISODE: Episode = {
  id: 1,
  title: "TEST EPISODE",
  description: "TEST EPISODE",
  createAt: new Date(),
  updateAt: new Date(),
  podcast: TEST_PODCAST,
};

const NEW_EPISODE: Episode = {
  id: 2,
  title: "NEW TEST EPISODE",
  description: "NEW TEST EPISODE",
  createAt: new Date(),
  updateAt: new Date(),
  podcast: TEST_PODCAST,
};

describe("EpisodesService", () => {
  let service: EpisodesService;
  let podcastRepository: MockRepository<Podcast>;
  let episodeRepository: MockRepository<Episode>;

  TEST_PODCAST.episodes.push(TEST_EPISODE);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EpisodesService,
        {
          provide: getRepositoryToken(Podcast),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Episode),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    service = module.get<EpisodesService>(EpisodesService);
    podcastRepository = module.get(getRepositoryToken(Podcast));
    episodeRepository = module.get(getRepositoryToken(Episode));
  });

  // 서비스가 정의되어 있는지 확인
  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(podcastRepository).toBeDefined();
    expect(episodeRepository).toBeDefined();
  });

  describe("createEpisode", () => {
    const podcastId = TEST_PODCAST.id;
    const podcastFindOneArgs = { where: { id: TEST_PODCAST.id } };

    const createEpisodeArgs = {
      title: NEW_EPISODE.title,
      description: NEW_EPISODE.description,
    };

    it("should success to create Episode", async () => {
      podcastRepository.findOne.mockResolvedValue(TEST_PODCAST);
      episodeRepository.create.mockReturnValue(TEST_EPISODE);
      episodeRepository.save.mockResolvedValue(TEST_EPISODE);

      const result = await service.createEpisode({
        podcastId,
        createEpisode: createEpisodeArgs,
      });

      expect(podcastRepository.findOne).toHaveBeenCalledTimes(1);
      expect(podcastRepository.findOne).toHaveBeenCalledWith(
        podcastFindOneArgs,
      );

      expect(episodeRepository.create).toHaveBeenCalledTimes(1);
      expect(episodeRepository.create).toHaveBeenCalledWith({
        ...createEpisodeArgs,
        podcast: TEST_PODCAST,
      });

      expect(episodeRepository.save).toHaveBeenCalledTimes(1);
      expect(episodeRepository.save).toHaveBeenCalledWith(TEST_EPISODE);

      expect(result).toEqual({ ok: true });
    });

    it("should fail to create Episode, because of getPodcast emitting error", async () => {
      podcastRepository.findOne.mockResolvedValue(null);

      const result = await service.createEpisode({
        podcastId,
        createEpisode: createEpisodeArgs,
      });
      expect(result).toEqual({ ok: false, error: "Podcast Not Found" });
    });

    it("should fail to create Episode, because of saving failed", async () => {
      podcastRepository.findOne.mockRejectedValue(new Error());

      const result = await service.createEpisode({
        podcastId,
        createEpisode: createEpisodeArgs,
      });
      expect(result).toEqual({ ok: false, error: "Could not create episode." });
    });
  });

  describe("getEpisodes", () => {
    const podcastId = TEST_PODCAST.id;
    const podcastFindOneArgs = { where: { podcast: { id: podcastId } } };

    it("should success to get episodes", async () => {
      episodeRepository.find.mockResolvedValue(TEST_EPISODE);

      const result = await service.getEpisodes({ podcastId });
      expect(episodeRepository.find).toHaveBeenCalledTimes(1);
      expect(episodeRepository.find).toHaveBeenCalledWith(podcastFindOneArgs);
      expect(result).toEqual({
        ok: true,
        episode: TEST_EPISODE,
      });
    });

    it("should return error if no episodes found", async () => {
      episodeRepository.find.mockResolvedValue(null);

      const result = await service.getEpisodes({ podcastId });
      expect(result).toEqual({
        ok: false,
        error: "Episode Not Found",
      });
    });

    it("should return error if there is an error during episode retrieval", async () => {
      episodeRepository.find.mockRejectedValue(new Error());

      const result = await service.getEpisodes({ podcastId });
      expect(result).toEqual({
        ok: false,
        error: "Could not get episode.",
      });
    });
  });

  describe("updateEpisode", () => {
    const episodeId = TEST_EPISODE.id;
    const findOneArgs = { where: { id: episodeId } };

    const updateDataArg = {
      title: "UPDATE TITLE",
      description: "UPDATE DESCRIPTION",
    };

    it("should success to update", async () => {
      episodeRepository.findOne.mockResolvedValue(TEST_EPISODE);
      episodeRepository.update.mockResolvedValue({
        ...TEST_EPISODE,
        ...updateDataArg,
      });

      const result = await service.updateEpisode({
        episodeId,
        updateEpisode: updateDataArg,
      });

      expect(episodeRepository.findOne).toHaveBeenCalledTimes(1);
      expect(episodeRepository.findOne).toHaveBeenCalledWith(findOneArgs);

      expect(episodeRepository.update).toHaveBeenCalledTimes(1);
      expect(episodeRepository.update).toHaveBeenCalledWith(episodeId, {
        ...updateDataArg,
      });

      expect(result).toEqual({ ok: true });
    });

    it("should return error if episode is not found", async () => {
      episodeRepository.findOne.mockResolvedValue(null);

      const result = await service.updateEpisode({
        episodeId,
        updateEpisode: updateDataArg,
      });
      expect(result).toEqual({ ok: false, error: "Episode Not Found" });
    });

    it("should return error if there is an error during episode update", async () => {
      episodeRepository.findOne.mockRejectedValue(new Error());

      const result = await service.updateEpisode({
        episodeId,
        updateEpisode: updateDataArg,
      });
      expect(result).toEqual({
        ok: false,
        error: "Could not update episode.",
      });
    });
  });

  describe("deleteEpisode", () => {
    const episodeId = TEST_EPISODE.id;
    const deleteOneArgs = { where: { id: episodeId } };

    it("should success to delete Episode", async () => {
      episodeRepository.findOne.mockResolvedValue(TEST_PODCAST);
      episodeRepository.delete.mockResolvedValueOnce({ affected: 1 });

      const result = await service.deleteEpisode({ episodeId });

      expect(episodeRepository.findOne).toHaveBeenCalledTimes(1);
      expect(episodeRepository.findOne).toHaveBeenCalledWith(deleteOneArgs);

      expect(episodeRepository.delete).toHaveBeenCalledTimes(1);
      expect(episodeRepository.delete).toHaveBeenCalledWith(episodeId);

      expect(result).toEqual({ ok: true });
    });

    it("should fail to delete Episode, because of getEpisode emitting erro", async () => {
      episodeRepository.findOne.mockResolvedValue(null);

      const result = await service.deleteEpisode({ episodeId });
      expect(result).toEqual({ ok: false, error: "Episode Not Found" });
    });

    it("should fail to delete Episode, because of deleting failed", async () => {
      episodeRepository.findOne.mockRejectedValue(new Error());

      const result = await service.deleteEpisode({ episodeId });
      expect(result).toEqual({ ok: false, error: "Could not delete episode." });
    });
  });
});
