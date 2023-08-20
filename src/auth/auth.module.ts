import { User } from './../user/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }