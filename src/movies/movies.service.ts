import { Injectable } from '@nestjs/common';
import {MoviesEntity} from "./movies.entity";
import $api from "../http";

@Injectable()
export class MoviesService {
    async getPopular(): Promise<MoviesEntity[]> {
        const movies = []
        const fetch_rated = await $api.get('https://api.themoviedb.org/3/movie/top_rated')
        for(const x of fetch_rated.data.results){
            const a = (await $api.get(`https://api.themoviedb.org/3/movie/${x.id}`)).data
            a.screens = (await $api.get(`https://api.themoviedb.org/3/movie/${x.id}/images?include_image_language=en,null`)).data.backdrops
            movies.push(a)
        }

        return movies.map(x => ({
            id: x.id,
            genres: x.genres.map(x => x.name),
            overview: x.overview,
            release_date: x.release_date,
            screens: x.screens.map(x => `https://image.tmdb.org/t/p/original${x.file_path}`),
            title: x.title
        }))
    }
}
