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

    async getAllRecords<Type>(collection: string): Promise<Type[]>{
        return await client.records.getFullList(collection, 10000000000000)
    }

    async updateRecord<Type>(collection: string, id: string, data: any): Promise<Type>{
        return await client.records.update(collection, id, {...data})
    }
}
