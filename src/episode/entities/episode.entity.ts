import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Podcast } from "src/podcast/entities/podcast.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@InputType("EpisodeInput", { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Column()
  @Field()
  @IsNumber()
  title: string;

  @Column()
  @Field()
  @IsString()
  description: string;

  @Field(() => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    onDelete: "CASCADE",
  })
  podcast: Podcast;
}
