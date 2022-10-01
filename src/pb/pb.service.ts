import { Injectable } from '@nestjs/common';
import {UserEntity} from "../user/user.entity";
import {RedisService} from "../redis/redis.service";
const PocketBase = require('pocketbase/cjs')
require('cross-fetch/polyfill')

const client = new PocketBase('https://pb.xoma-star.tk');

@Injectable()
export class PbService {
    constructor(private redisService: RedisService) {}
    async getRecord<Type>(collection: string, id: string): Promise<Type>{
        return await client.records.getOne(collection, id, {}) as Type
    }

    async createRecord(collection: string, data: UserEntity): Promise<any>{
        return await client.records.create(collection, {...data})
    }

    async getAllRecords<Type>(collection: string): Promise<Type[]>{
        const redisCache = await this.redisService.get(collection)
        if(!redisCache){
            const list = await client.records.getFullList(collection, 1000000)
            await this.redisService.set(collection, JSON.stringify(list.sort(() => 0.5 - Math.random())))
            return list
        }
        return JSON.parse(redisCache)
    }

    async getRecords<Type>(collection: string, count: number, filter?: string): Promise<Type[]>{
        const obj = {}
        if(filter) obj['filter'] = filter
        return (await client.records.getList(collection, 1, count, {...obj})).items
    }

    async updateRecord<Type>(collection: string, id: string, data: any): Promise<Type>{
        return await client.records.update(collection, id, {...data})
    }
}
