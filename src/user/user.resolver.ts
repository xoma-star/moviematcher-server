import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {UpdateUserInputType} from "./update.user.input.type";
import {pushMovieToType} from "./pushMovie.user.input.type";
import {Response} from "express";
import {HttpException, HttpStatus, Res} from "@nestjs/common";
import {VkService} from "../vk/vk.service";
import {MoviesEntity} from "../movies/movies.entity";
import {MoviesService} from "../movies/movies.service";

@Resolver()
export class UserResolver {
    constructor(private userService: UserService, private vkService: VkService, private movieService: MoviesService) {}
    @Query(() => UserEntity)
    async getUser(@Args('id', {type: () => String}) id: string): Promise<UserEntity>{
        return await this.userService.getById(id)
    }
    @Query(() => UserEntity)
    async getUserByVk(@Args('id', {type: () => Int}) id: number): Promise<UserEntity>{
        return await this.userService.getIdByVk(id)
    }
    @Mutation(() => UserEntity)
    async createUser(@Args('id', {type: () => Int}) id: number): Promise<UserEntity>{
        return await this.userService.createUser(id)
    }
    @Mutation(() => UserEntity)
    async updateUser(@Args('id', {type: () => String}) id: string,
                     @Args('data', {type: () => UpdateUserInputType}) data: UserEntity){
        return await this.userService.updateUser(id, data)
    }
    @Mutation(() => UserEntity)
    async pushMovie(
        @Args('id', {type: () => String}) id: string,
        @Args('to', {type: () => pushMovieToType}) to: pushMovieToType,
        @Args('movieId', {type: () => String}) movieId: string,
        @Args('force', {type: () => Boolean, nullable: true, defaultValue: false}) force: boolean = false,
        @Res() res: Response
    ){
       try{
           const currentMovies = await this.userService.getById(id)
           if(!currentMovies) throw new HttpException('Аккаунт не найден', HttpStatus.NOT_FOUND)
           if(!res.req.headers.authorization) throw new HttpException('Невозможно авторизовать', HttpStatus.BAD_REQUEST)
           if(!this.vkService.validateSign(res.req.headers.authorization as string)) throw new HttpException('Неверная подпись', HttpStatus.FORBIDDEN)
           const movie = await this.movieService.getMovie(movieId)
           if(!movie) throw new HttpException('Фильм не найден', HttpStatus.NOT_FOUND)
           if(!force){
               for(const v of Object.keys(currentMovies)){
                   if(Array.isArray(currentMovies[v]) && currentMovies[v].indexOf(movieId) >= 0) throw new HttpException('Уже оценено', HttpStatus.FORBIDDEN)
               }
           }else{
               for(const v of Object.keys(currentMovies)){
                   if(!Array.isArray(currentMovies[v])) continue
                   const index = currentMovies[v].indexOf(movieId)
                   if(index >= 0) currentMovies[v].splice(index, 1)
               }
           }
           currentMovies[to].push(movieId)
           return await this.updateUser(id, {...currentMovies})
       }catch (e) {throw e}
    }
    @Mutation(() => UserEntity)
    async updateGenres(
        @Args('id', {type: () => String}) id: string,
        @Args('genres', {type: () => [String]}) genres: string[],
        @Res() res: Response
    ){
        try {
            const user = await this.userService.getById(id)
            if(!user) throw new HttpException('Аккаунт не найден', HttpStatus.NOT_FOUND)
            if(!res.req.headers.authorization) throw new HttpException('Невозможно авторизовать', HttpStatus.BAD_REQUEST)
            if(!this.vkService.validateSign(res.req.headers.authorization as string)) throw new HttpException('Неверная подпись', HttpStatus.FORBIDDEN)
            return await this.updateUser(id, {favourite_genres: genres})
        }catch (e) {throw e}
    }
    @Query(() => [MoviesEntity])
    async getRecommended(
        @Args('id', {type: () => String}) id: string,
        @Args('count', {nullable: true, defaultValue: 5, type: () => Int}) count: number = 5
    ){
        try {
            // const filter = rated.map(x => `id != '${x}'`).join(' && ')
            return this.userService.getRecommended(id, count)
        }catch (e) {throw e}
    }
}
