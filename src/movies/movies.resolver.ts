import {Query, Resolver} from '@nestjs/graphql';
import {MoviesService} from "./movies.service";
import {MoviesEntity} from "./movies.entity";

@Resolver(of => MoviesEntity)
export class MoviesResolver {
    constructor(private moviesService: MoviesService) {}

    @Query(returns => [MoviesEntity])
    async popular(): Promise<MoviesEntity[]>{
        return this.moviesService.getPopular()
    }
    @Query(() => [String])
    async getGenreList(): Promise<string[]>{
        return this.moviesService.getGenres()
    }
}
