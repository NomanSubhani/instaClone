import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Hashtags } from './entities/hashtags.entity';


@Module({
  imports: [ 
  TypeOrmModule.forFeature([Post,Hashtags])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {
  constructor() {
    console.log('post Module');
  }
}