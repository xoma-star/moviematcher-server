import { Module } from '@nestjs/common';
import { PbService } from './pb.service';
import {RedisService} from "../redis/redis.service";

@Module({
  providers: [PbService, RedisService]
})
export class PbModule {}
