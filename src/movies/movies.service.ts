import { Injectable } from '@nestjs/common';
import {MoviesEntity} from "./movies.entity";
import $api from "../http";
import {PbService} from "../pb/pb.service";

@Injectable()
export class MoviesService {
    constructor(private pbService: PbService) {}
    // async getPopular(): Promise<MoviesEntity[]> {
    //     const movies = []
    //     const fetch_rated = await $api.get('https://api.themoviedb.org/3/movie/top_rated')
    //     for(const x of fetch_rated.data.results){
    //         const a = (await $api.get(`https://api.themoviedb.org/3/movie/${x.id}`)).data
    //         a.screens = (await $api.get(`https://api.themoviedb.org/3/movie/${x.id}/images?include_image_language=en,null`)).data.backdrops
    //         movies.push(a)
    //     }
    //
    //     return movies.map(x => ({
    //         id: x.id,
    //         genres: x.genres.map(x => x.name),
    //         overview: x.overview,
    //         release_date: x.release_date,
    //         screens: x.screens.slice(0, 4).map(async x => {
    //             const ext = x.file_path.split('.').pop()
    //             const response = await $api.get(`https://image.tmdb.org/t/p/original${x.file_path}`, {responseType: 'arraybuffer'})
    //             return `data:image/${ext};base64,${Buffer.from(response.data).toString('base64')}`
    //         }),
    //         title: x.title
    //     }))
    // }
    async getMovie(id: string): Promise<MoviesEntity>{
        return await this.pbService.getRecord('movies', id)
    }
    async getGenres(): Promise<string[]>{
        const genres = await $api.get('https://api.themoviedb.org/3/genre/movie/list')

        return genres.data.genres.map(x => x.name)
    }

    async getMovies(ids: string[]): Promise<MoviesEntity[]>{
        return await this.pbService.getRecords('movies', ids.length, ids.map(x => `id = '${x}'`).join(' || '))
    }

    async getAllMovies(): Promise<MoviesEntity[]>{
        return await this.pbService.getAllRecords<MoviesEntity>('movies')
    }
}
