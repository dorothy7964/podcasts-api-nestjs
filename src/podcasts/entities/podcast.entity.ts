import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Episode } from "src/episodess/entities/episode.entity";
import { Column, Entity, OneToMany } from "typeorm";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Field(() => String)
  @IsString()
  @Column()
  title: string;

  @Field(() => String)
  @IsString()
  @Column()
  category: string;

  @Field(() => Number)
  @IsNumber()
  @Column()
  rating?: number;

  @Field(() => [Episode], { nullable: true })
  @OneToMany(() => Episode, (episode) => episode.podcast)
  episodes?: Episode[];
}
