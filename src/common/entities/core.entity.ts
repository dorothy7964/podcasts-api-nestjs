import { Field, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class CoreEntity {
  @Field(() => Number)
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  createAt: Date;

  @Field(() => Date)
  @CreateDateColumn()
  updateAt: Date;
}
