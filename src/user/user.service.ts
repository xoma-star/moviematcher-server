import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PbService} from "../pb/pb.service";
import {UserEntity} from "./user.entity";
import {MoviesService} from "../movies/movies.service";

@Injectable()
export class UserService {
    constructor(private pbService: PbService, private movieService: MoviesService) {}

    async getById(id: string): Promise<UserEntity>{
        return await this.pbService.getRecord<UserEntity>('users', id)
    }
    async getIdByVk(id: number): Promise<UserEntity>{
        try{
            const all = await this.pbService.getRecords<UserEntity>('users', 1, `vk_user_id = ${id}`)
            const needed = all.find(x => x.vk_user_id === id)
            if(!needed) throw new HttpException('Не найдено', HttpStatus.NOT_FOUND)
            return needed
        }catch (e) {throw e}

    }
    async createUser(id: number): Promise<UserEntity>{
        return await this.pbService.createRecord('users', {
            vk_user_id: id,
            liked: [],
            disliked: [],
            saved: [],
            skipped: [],
            favourite_genres: []
        })
    }

    async updateUser(id: string, data: any): Promise<UserEntity>{
        return await this.pbService.updateRecord('users', id, data)
    }

    async getRecommended(id: string, count: number){
        const user = await this.getById(id)
        if(!user) throw new HttpException('Не найден', HttpStatus.NOT_FOUND)
        const rated = [...user.saved, ...user.skipped, ...user.liked, ...user.disliked]
        const movies = await this.movieService.getAllMovies()
        const filtered = movies
            .filter(x => rated.indexOf(x.id) < 0 && x.popularity > 30)
            .map(x => {
                let count = 0
                x.genres.forEach(v => {
                    if(user.favourite_genres.some(s => s === v)) count ++
                })
                return {...x, genresMatch: count / user.favourite_genres.length}
            })
            .sort((a, b) => a.genresMatch < b.genresMatch ? 1 : -1)
            .slice(0, count)
        // const returned = []
        // while(returned.length < count){
        //     returned.push(filtered[Math.floor(Math.random() * filtered.length)])
        // }
        return filtered
            .map(x => ({...x, screens: [...x.screens].sort(() => 0.5 - Math.random()).slice(0, 4).map(v => `https://api.xoma-star.tk/image/${encodeURIComponent(v)}`)}))
    }
}
