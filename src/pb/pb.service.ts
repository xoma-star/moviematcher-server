import { Injectable } from '@nestjs/common';
import {UserEntity} from "../user/user.entity";
const PocketBase = require('pocketbase/cjs')
require('cross-fetch/polyfill')

const client = new PocketBase('https://pb.xoma-star.tk');

@Injectable()
export class PbService {
    async getRecord<Type>(collection: string, id: string): Promise<Type>{
        return await client.records.getOne(collection, id, {}) as Type
    }

    async createRecord(collection: string, data: UserEntity): Promise<any>{
        return await client.records.create(collection, {...data})
    }

    async getRecords<Type>(collection: string, count: number, filter?: string): Promise<Type[]>{
        const obj = {}
        if(filter) obj['filter'] = filter
        return (await client.records.getList(collection, parseInt((Math.random() * 10000).toString()), count, {...obj})).items
    }

    async updateRecord<Type>(collection: string, id: string, data: any): Promise<Type>{
        return await client.records.update(collection, id, {...data})
    }
}
