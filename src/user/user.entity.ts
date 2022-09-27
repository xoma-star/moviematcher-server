import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class UserEntity{
    @Field(() => String, {nullable: true})
    id?: string
    @Field(() => Int)
    vk_user_id?: number
    @Field(() => [String])
    liked?: string[]
    @Field(() => [String])
    disliked?: string[]
    @Field(() => [String])
    saved?: string[]
    @Field(() => [String])
    skipped?: string[]
    @Field(() => [String])
    favourite_genres?: string[]
}