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
├── podcasts/
│   ├── entities/
│   │   ├── podcast.entity.ts
│   │   └── episode.entity.ts
│   ├── podcasts.controller.ts
│   ├── podcasts.module.ts
│   └── podcasts.service.ts
├── app.module.ts
└── main.ts
```
