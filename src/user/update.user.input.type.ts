import {Field, InputType, Int} from "@nestjs/graphql";
import {UserEntity} from "./user.entity";

@InputType()
export class UpdateUserInputType extends UserEntity{
    @Field(() => [Int], {nullable: true})
    liked?: number[]
    @Field(() => [Int], {nullable: true})
    disliked?: number[]
    @Field(() => [Int], {nullable: true})
    saved?: number[]
    @Field(() => [Int], {nullable: true})
    skipped?: number[]
    @Field(() => [Int], {nullable: true})
    willBeShown?: number[]
}