import {Field, Float, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class MoviesEntity{
    @Field({description: 'id на tmdb'})
    tmdb_id: number
    @Field()
    id: string
    @Field()
    imdb_id: string
    @Field(() => Float)
    rating: number
    @Field(() => [String])
    companies: string[]
    @Field(() => [String])
    countries: string[]
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
    @Field(() => Float)
    popularity: number
    @Field(() => Int)
    runtime: number
}