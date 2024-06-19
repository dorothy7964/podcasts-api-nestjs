import { Episode } from "../entities/episode.entity";
import { CreatePodcastDto } from "./create-podcast.dto";

export class CreateEpisodeDto
  extends CreatePodcastDto
  implements Omit<Episode, "id">
{
  episodeTitle: string;
  duration: number;
}
