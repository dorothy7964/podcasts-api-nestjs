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
├── auth/
│   ├── auth-user.decorator.ts
│   ├── auth.guard.ts
│   └── auth.module.ts
├── common/
│   ├── dtos/
│   │   ├── output.dto.ts
│   ├── entities/
│   │   ├── core.entity.ts
│   ├── common.module.ts
├── episode/
│   ├── dtos/
│   │   ├── create-episode.dto.ts
│   │   ├── delete-episode.dto.ts
│   │   ├── search-episode.dto.ts
│   │   ├── update-episode.dto.ts
│   ├── entities/
│   │   └── episode.entity.ts
│   ├── episodes.module.ts
│   ├── episodes.resolver.ts
│   └── episodes.service.ts
├── jwt/
│   ├── jwt.constants.ts
│   ├── jwt.interfaces.ts
│   └── jwt.middleware.ts
│   ├── jwt.module.ts
│   └── jwt.service.ts
├── podcast/
│   ├── dtos/
│   │   ├── create-podcast.dto.ts
│   │   ├── delete-podcast.dto.ts
│   │   ├── search-podcast.dto.ts
│   │   ├── update-podcast.dto.ts
│   ├── entities/
│   │   ├── podcast.entity.ts
│   ├── podcasts.module.ts
│   ├── podcasts.resolver.ts
│   └── podcasts.service.ts
├── users/
│   ├── dtos/
│   │   ├── create-account.dto.ts
│   │   ├── edit-profile.dto.ts
│   │   ├── login.dto.ts
│   │   ├── user-profile.dto.ts
│   ├── entities/
│   │   ├── user.entity.ts
│   ├── users.module.ts
│   ├── users.resolver.ts
│   └── users.service.ts
├── app.module.ts
└── main.ts
```
