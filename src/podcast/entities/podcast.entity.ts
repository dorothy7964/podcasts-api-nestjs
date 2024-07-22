import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Episode } from "src/episode/entities/episode.entity";
import { Column, Entity, OneToMany } from "typeorm";

@InputType("PodcastInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  title: string;

  @Column()
  @Field(() => String)
  @IsString()
  category: string;

  @Column()
  @Field(() => Number, { defaultValue: 0 })
  @IsNumber()
  rating?: number;

  @Field(() => [Episode], { nullable: true })
  @OneToMany(() => Episode, (episode) => episode.podcast)
  episodes?: Episode[];
}
