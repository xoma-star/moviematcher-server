import {Injectable} from '@nestjs/common';
import * as Redis from 'redis'

const client = Redis.createClient({url: 'redis://45.159.249.198:6379'});
(async () => {
    try{
        await client.connect()
        console.log('Redis connected')
    }catch (e){process.exit(1)}
})()

@Injectable()
export class RedisService {
    async set(field: string, value: string){
        await client.set(field, value)
    }

    async get(field: string) {
        return await client.get(field)
    }
}
