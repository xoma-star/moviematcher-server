import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import {PbService} from "../pb/pb.service";

@Module({
  providers: [MoviesService, MoviesResolver, PbService]
})
export class MoviesModule {}
