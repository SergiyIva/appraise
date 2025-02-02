import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field()
  id: number;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  level: number;
  @Field(() => Number, { nullable: true })
  managerId: number;
  @Field(() => [Number])
  path: number[];
}
