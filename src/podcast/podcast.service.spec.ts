import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Podcast } from "./entities/podcast.entity";
import { PodcastsService } from "./podcasts.service";

export type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const TEST_PODCAST: Podcast = {
  id: 1,
  title: "TEST PODCAST",
  category: "TEST PODCAST",
  rating: 0,
  episodes: [],
  createAt: new Date(),
  updateAt: new Date(),
};

const NEW_PODCAST: Podcast = {
  id: 2,
  title: "NEW TEST PODCAST",
  category: "NEW TEST PODCAST",
  rating: 0,
  episodes: [],
  createAt: new Date(),
  updateAt: new Date(),
};

describe("PodcastsService", () => {
  let service: PodcastsService;
  let podcastRepository: MockRepository<Podcast>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PodcastsService,
        {
          provide: getRepositoryToken(Podcast),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    service = module.get<PodcastsService>(PodcastsService);
    podcastRepository = module.get(getRepositoryToken(Podcast));
  });

  // 서비스가 정의되어 있는지 확인
  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(podcastRepository).toBeDefined();
  });

  describe("createPodcast", () => {
    const createPodcastArgs = {
      title: NEW_PODCAST.title,
      category: NEW_PODCAST.category,
    };

    it("should success to create Podcast", async () => {
      const newPodcast = {
        ...createPodcastArgs,
        episodes: [],
      };

      podcastRepository.create.mockReturnValue(newPodcast);
      podcastRepository.save.mockResolvedValue(NEW_PODCAST);

      const result = await service.createPodcast(newPodcast);

      expect(podcastRepository.create).toHaveBeenCalledTimes(1);
      expect(podcastRepository.create).toHaveBeenCalledWith(newPodcast);

      expect(podcastRepository.save).toHaveBeenCalledTimes(1);
      expect(podcastRepository.save).toHaveBeenCalledWith(newPodcast);

      expect(result).toEqual({
        ok: true,
        id: NEW_PODCAST.id,
      });
    });

    it("Input data validation failed", async () => {
      const newPodcast = {
        title: "",
        category: NEW_PODCAST.category,
      };

      const result = await service.createPodcast(newPodcast);
      expect(result).toEqual({
        ok: false,
        error: "Title and category are required.",
      });
    });

    it("should failed to create Podcast", async () => {
      podcastRepository.findOne.mockRejectedValue(new Error());

      const result = await service.createPodcast(createPodcastArgs);
      expect(result).toEqual({ ok: false, error: "Couldn`t create podcast" });
    });
  });

  describe("getAllPodcasts", () => {
    it("should success to return podcasts", async () => {
      podcastRepository.find.mockResolvedValue([TEST_PODCAST, NEW_PODCAST]);

      const result = await service.getAllPodcasts();
      expect(podcastRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ok: true,
        allPodcast: [TEST_PODCAST, NEW_PODCAST],
      });
    });

    it("should fail to return podcasts", async () => {
      podcastRepository.find.mockRejectedValueOnce(new Error("MockedError"));

      const result = await service.getAllPodcasts();
      expect(podcastRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ok: false,
        error: "Could not get podcast.",
      });
    });
  });

  describe("getPodcast", () => {
    const podcastId = TEST_PODCAST.id;
    const findOneArgs = { where: { id: TEST_PODCAST.id } };

    it("should success to get podcast", async () => {
      podcastRepository.findOne.mockResolvedValue(TEST_PODCAST);

      const result = await service.getPodcast({ podcastId });
      expect(podcastRepository.findOne).toHaveBeenCalledTimes(1);
      expect(podcastRepository.findOne).toHaveBeenCalledWith(findOneArgs);
      expect(result).toEqual({
        ok: true,
        podcast: TEST_PODCAST,
      });
    });

    it("should fail to get podcast, because record not found", async () => {
      podcastRepository.findOne.mockResolvedValue(null);

      const result = await service.getPodcast({ podcastId });
      expect(result).toEqual({
        ok: false,
        error: "Podcast Not Found",
      });
    });

    it("should fail to get podcast, because of error on findOne", async () => {
      podcastRepository.findOne.mockRejectedValueOnce(new Error("MockedError"));

      const result = await service.getPodcast({ podcastId });
      expect(result).toEqual({
        ok: false,
        error: "Could not get podcast.",
      });
    });
  });

  describe("updatePodcast", () => {
    const podcastId = TEST_PODCAST.id;
    const findOneArgs = { where: { id: TEST_PODCAST.id } };

    const updateDataArg = {
      title: "UPDATE TITLE",
      category: "UPDATE CATEGORY",
    };

    it("should success to update Podcast", async () => {
      podcastRepository.findOne.mockResolvedValue(TEST_PODCAST); // 초기 데이터 조회
      podcastRepository.update.mockResolvedValue({
        ...TEST_PODCAST,
        ...updateDataArg,
      }); // 업데이트 성공
      podcastRepository.findOne.mockResolvedValue({
        ...TEST_PODCAST,
        ...updateDataArg,
      }); // 업데이트 데이터 조회

      const result = await service.updatePodcast({
        podcastId,
        updateData: updateDataArg,
      });

      expect(podcastRepository.findOne).toHaveBeenCalledTimes(2); // 처음 조회와 업데이트 후 조회
      expect(podcastRepository.findOne).toHaveBeenCalledWith(findOneArgs);

      expect(podcastRepository.update).toHaveBeenCalledTimes(1);
      expect(podcastRepository.update).toHaveBeenCalledWith(
        podcastId,
        updateDataArg,
      );

      expect(result).toEqual({
        ok: true,
        podcast: { ...TEST_PODCAST, ...updateDataArg },
      });
    });

    it("should fail to update Podcast, because of saving failed", async () => {
      podcastRepository.findOne.mockResolvedValue(null);

      const result = await service.updatePodcast({
        podcastId,
        updateData: updateDataArg,
      });

      expect(result).toEqual({
        ok: false,
        error: "Podcast Not Found",
      });
    });

    it("should fail to update Podcast, due to invalid payload", async () => {
      podcastRepository.findOne.mockResolvedValue(TEST_PODCAST);
      podcastRepository.update.mockRejectedValue(new Error());

      const result = await service.updatePodcast({
        podcastId,
        updateData: updateDataArg,
      });
      expect(result).toEqual({
        ok: false,
        error: "Could not update podcast.",
      });
    });
  });

  describe("deletePodcast", () => {
    const podcastId = TEST_PODCAST.id;
    const deleteOneArgs = { where: { id: TEST_PODCAST.id } };

    it("should success to delete", async () => {
      podcastRepository.findOne.mockResolvedValue(TEST_PODCAST);
      podcastRepository.delete.mockResolvedValueOnce({ affected: 1 });

      const result = await service.deletePodcast({ podcastId });

      expect(podcastRepository.findOne).toHaveBeenCalledTimes(1);
      expect(podcastRepository.findOne).toHaveBeenCalledWith(deleteOneArgs);

      expect(podcastRepository.delete).toHaveBeenCalledTimes(1);
      expect(podcastRepository.delete).toHaveBeenCalledWith(podcastId);

      expect(result).toEqual({ ok: true });
    });

    it("should fail becuase of deleting failed", async () => {
      podcastRepository.findOne.mockResolvedValue(null);

      const result = await service.deletePodcast({ podcastId });
      expect(result).toEqual({ ok: false, error: "Podcast Not Found" });
    });

    it("should fail to delete, because of getPodcast emitting error", async () => {
      podcastRepository.findOne.mockRejectedValue(new Error());

      const result = await service.deletePodcast({ podcastId });
      expect(result).toEqual({
        ok: false,
        error: "Could not delete podcast.",
      });
    });
  });
});
