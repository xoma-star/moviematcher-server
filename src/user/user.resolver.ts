import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {UpdateUserInputType} from "./update.user.input.type";

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}
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
}
