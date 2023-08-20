import { Hashtags } from 'src/post/entities/hashtags.entity';
import { UserModule } from 'src/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { AuthModule } from './auth/auth.module';
import { Post } from './post/entities/post.entity';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule,UserModule, ProfileModule,TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    })],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [User,Profile,Post,Hashtags],
      synchronize: configService.get<boolean>('DB_SYNC'),
      logging:true
    }),
    inject: [ConfigService],
  })],
  controllers: [],
  providers: [],
})
export class RootModule {
  constructor() {
    console.log('Root Module');
  }
}
