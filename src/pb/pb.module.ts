import { Module } from '@nestjs/common';
import { PbService } from './pb.service';

@Module({
  providers: [PbService]
})
export class PbModule {}
