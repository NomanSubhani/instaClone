import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
// import { classToPlain, instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByEmail(email: string) {
    const result = await this.userRepository.findOneBy({ email: email });
    return result;
  }


  async createUserService(createUserDto: CreateUserDto) {
    try {
      let user: User = new User();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = await bcrypt.hash(createUserDto.password, 10);
      // return instanceToPlain(await this.userRepository.save(user), { excludePrefixes: ['password'] });
      delete user.password;
      return user;
    } catch (e) {
      console.log("error", e);
      throw e;
    }
  }

  async updateUserService(id: number, updateUserDto: UpdateUserDto) {

    return this.userRepository
      .createQueryBuilder()
      .update()
      .set({
        username: updateUserDto.username,
        email: updateUserDto.email,
        password: updateUserDto.password
      })
      .where('id = :id', { id })
      .execute();
  }

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async signInService(email: string, pass: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    // const userLogin = instanceToPlain(user, { excludePrefixes: ['password'] })
    delete user.password
    return user;
  }
}

