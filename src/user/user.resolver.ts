import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {UpdateUserInputType} from "./update.user.input.type";
import {pushMovieToType} from "./pushMovie.user.input.type";
import {Response} from "express";
import {HttpException, HttpStatus, Res} from "@nestjs/common";
import {VkService} from "../vk/vk.service";

@Resolver()
export class UserResolver {
    constructor(private userService: UserService, private vkService: VkService) {}
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
        @Args('movieId', {type: () => Int}) movieId: number,
        @Res() res: Response
    ){
       try{
           const currentMovies = await this.userService.getById(id)
           if(!currentMovies) throw new HttpException('Аккаунт не найден', HttpStatus.NOT_FOUND)
           if(!res.req.headers.vk_params) throw new HttpException('Невозможно авторизовать', HttpStatus.BAD_REQUEST)
           if(!this.vkService.validateSign(res.req.headers.vk_params as string)) throw new HttpException('Неверная подпись', HttpStatus.FORBIDDEN)
           for(const v of Object.keys(currentMovies)){
               if(Array.isArray(currentMovies[v]) && currentMovies[v].indexOf(movieId) >= 0) throw new HttpException('Уже оценено', HttpStatus.FORBIDDEN)
           }
           currentMovies[to].push(movieId)
           return await this.updateUser(id, {[to]: currentMovies[to]})
       }catch (e) {throw e}
    }
}
