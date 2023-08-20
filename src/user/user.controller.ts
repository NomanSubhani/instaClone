import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/findAll')
    getAllUsers() {
        return this.userService.findAllUsers();
    }

    @Put('/update/:id')
    updateUsers(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
        // return this.userService.updateUserService(user);
        return this.userService.updateUserService(id, createUserDto);
    }

    @Post('/add')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUserService(createUserDto);
    }

    @Post('/signin')
    signin(@Body() createUserDto: CreateUserDto) {
        return this.userService.signInService(createUserDto.email, createUserDto.password);
    }
}

