import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { MongoModule } from './mongo/mongo.module';
import * as path from "path";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      }),
      MongooseModule.forRoot('mongodb+srv://xoma:-G9v%40fNF8Zd%23h%40%23@moviemathcer.xis8i1j.mongodb.net/?retryWrites=true&w=majority'),
      MoviesModule,
      MongoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
