import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {PbService} from "../pb/pb.service";
import { UserResolver } from './user.resolver';
import {VkService} from "../vk/vk.service";

@Module({
  providers: [UserService, PbService, UserResolver, VkService]
})
export class UserModule {}
