import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private jwtService: JwtService) { }

    
  async signIn(email: string, pass: string) {
    try {
      
      const user = await this.usersService.findByEmail(email);
      const isMatch=await bcrypt.compare(pass,user.password)
      if (!isMatch) {
        console.log("error")
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log("error",error)
    }
  }
}