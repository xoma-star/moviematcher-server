import {Args, Query, Resolver} from '@nestjs/graphql';
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
        @Args('ids', {type: () => [String]}) movies: string[]
    ){
        return await this.moviesService.getMovies(movies)
    }
    @Query(() => [MoviesEntity])
    async getAllMovies(){
        return await this.moviesService.getAllMovies()
    }
}
