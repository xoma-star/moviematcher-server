import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {PbService} from "../pb/pb.service";
import { UserResolver } from './user.resolver';
import {VkService} from "../vk/vk.service";
import {MoviesService} from "../movies/movies.service";
import {RedisService} from "../redis/redis.service";

@Module({
  providers: [UserService, PbService, UserResolver, VkService, MoviesService, RedisService]
})
export class UserModule {}
