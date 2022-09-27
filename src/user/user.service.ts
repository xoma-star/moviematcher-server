import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PbService} from "../pb/pb.service";
import {UserEntity} from "./user.entity";

@Injectable()
export class UserService {
    constructor(private pbService: PbService) {}

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
}
