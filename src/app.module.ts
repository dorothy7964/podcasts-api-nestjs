import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Podcast } from "./podcast/entities/podcast.entity";
import { Episode } from "./episode/entities/episode.entity";
import { PodcastsModule } from "./podcast/podcasts.module";
import { EpisodesModule } from "./episode/episodes.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".dev.test",
      ignoreEnvFile: process.env.NODE_ENV === "prod",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // port는 number 값이어야 한다. + 붙여주기
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== "prod",
      logging: process.env.NODE_ENV !== "prod",
      entities: [Podcast, Episode],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PodcastsModule,
    EpisodesModule,
  ],
})
export class AppModule {}
