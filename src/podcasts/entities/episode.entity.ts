import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Podcast } from "./podcast.entity";

@InputType("EpisodeInput", { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Field()
  @IsNumber()
  @Column()
  title: string;

  @Field()
  @IsString()
  @Column()
  description: string;

  @Field(() => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    onDelete: "CASCADE",
  })
  podcast: Podcast;
}
