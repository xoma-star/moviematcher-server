import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class UserEntity{
    @Field(() => String, {nullable: true})
    id?: string
    @Field(() => Int)
    vk_user_id?: number
    @Field(() => [Int])
    liked?: number[]
    @Field(() => [Int])
    disliked?: number[]
    @Field(() => [Int])
    saved?: number[]
    @Field(() => [Int])
    skipped?: number[]
    @Field(() => [Int])
    willBeShown?: number[]
}