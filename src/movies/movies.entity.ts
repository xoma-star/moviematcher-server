import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class MoviesEntity{
    @Field({description: 'id на tmdb'})
    id: number
    @Field({description: 'название фильма'})
    title: string
    @Field({description: 'краткое описание'})
    overview: string
    @Field(() => [String],{description: 'жанры'})
    genres: string[]
    @Field({description: 'дата выхода'})
    release_date: string
    @Field(() => [String], {description: 'кадры'})
    screens: string[]
}