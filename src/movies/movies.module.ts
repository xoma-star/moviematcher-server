import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import {PbService} from "../pb/pb.service";
import {RedisService} from "../redis/redis.service";

@Module({
  providers: [MoviesService, MoviesResolver, PbService, RedisService]
})
export class MoviesModule {}
