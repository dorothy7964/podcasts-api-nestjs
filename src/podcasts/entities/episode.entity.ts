import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";

@InputType("EpisodeInput", { isAbstract: true })
@ObjectType()
export class Episode {
  @Field(() => Number)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
