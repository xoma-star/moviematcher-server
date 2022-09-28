import {Args, Int, Query, Resolver} from '@nestjs/graphql';
import {MoviesService} from "./movies.service";
import {MoviesEntity} from "./movies.entity";

@Resolver(() => MoviesEntity)
export class MoviesResolver {
    constructor(private moviesService: MoviesService) {}
    @Query(() => [String])
    async getGenreList(): Promise<string[]>{
        return this.moviesService.getGenres()
    }
    @Query(() => [MoviesEntity])
    async getMovies(
        @Args('count', {type: () => Int!}) count: number,
        @Args('filter', {type: () => String, nullable: true}) filter?: string
    ){
        return await this.moviesService.getMovies(count, filter)
    }
    @Query(() => [MoviesEntity])
    async getAllMovies(){
        return await this.moviesService.getAllMovies()
    }
}
