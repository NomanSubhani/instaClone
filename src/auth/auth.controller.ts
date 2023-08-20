import { Public } from './../decorators/public.decorators';
import { Get } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  // @Public()s
  @Post('/login')
  signIn(@Body() signInDto: CreateAuthDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

}
// @UseGuards(AuthGuard)
// @Get('profile')
// getProfile(@Request() req) {
//   return req.user;
// }