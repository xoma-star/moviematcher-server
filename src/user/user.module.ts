import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {PbService} from "../pb/pb.service";
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, PbService, UserResolver]
})
export class UserModule {}
