## REST API

- GET /podcasts
- POST /podcasts
- GET /podcasts/:id
- PATCH /podcasts/:id
- DELETE /podcasts/:id
- GET /podcasts/:id/episodes
- POST /podcasts/:id/episodes
- PATCH /podcasts/:id/episodes/:episodeId
- DELETE /podcasts/:id/episodes/:episodeId

<br/><br/>

## 프로젝트 구조

```
src/
├── common/
│   ├── dtos/
│   │   ├── output.dto.ts
│   ├── entities/
│   │   ├── core.entity.ts
│   ├── common.module.ts
├── podcasts/
│   ├── dtos/
│   │   ├── create-episode.dto.ts
│   │   ├── create-podcast.dto.ts
│   │   ├── search-episode.dto.ts
│   │   ├── search-podcast.dto.ts
│   │   ├── update-episode.dto.ts
│   │   ├── update-podcast.dto.ts
│   ├── entities/
│   │   ├── podcast.entity.ts
│   │   └── episode.entity.ts
│   ├── podcasts.module.ts
│   ├── podcasts.resolver.ts
│   └── podcasts.service.ts
├── app.module.ts
└── main.ts
```
