import { Field, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @CreateDateColumn()
  @Field(() => Date)
  updateAt: Date;
}
