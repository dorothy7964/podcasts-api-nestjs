import { Podcast } from "../entities/podcasts.entity";

export class CreatePodcastDto implements Omit<Podcast, "id" | "episodes"> {
  title: string;
  category: string;
  rating: number;
}
