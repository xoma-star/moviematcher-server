import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class UpdateUserInputType{
    @Field(() => [String], {nullable: true})
    liked?: string[]
    @Field(() => [String], {nullable: true})
    disliked?: string[]
    @Field(() => [String], {nullable: true})
    saved?: string[]
    @Field(() => [String], {nullable: true})
    skipped?: string[]
    @Field(() => [Int], {nullable: true})
    willBeShown?: number[]
}