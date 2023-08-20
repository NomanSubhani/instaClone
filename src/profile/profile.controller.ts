import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import {
    Body, Controller, FileTypeValidator,
    Get, Param, ParseFilePipe, Post, Put,
    UploadedFile, UseInterceptors
} from "@nestjs/common";
import { ProfileService } from "./profile.service";


@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get('/findProfiles')
    getAllProfiles() {
        return this.profileService.findAllProfiles();
    }

    @Post('/add/:userid')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: 'src/profile/uploads',
            filename: (req, file, cb) => {
                return cb(null, `${file.originalname}`)
            }
        })
    }))
    addProfile(@Param('userid') userId: number, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    })) image: Express.Multer.File, @Body() createprofileDto: CreateProfileDto) {
        const imagePath = image.path;
        return this.profileService.createProfileService(userId, imagePath, createprofileDto);
    }

    @Put('/update/:id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: 'src/profile/uploads',
            filename: (req, file, cb) => {
                return cb(null, `${file.originalname}`)
            }
        })
    }))
    updateProfile(@Param('id') id: number, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    })) image: Express.Multer.File, @Body() updateProfileDto: UpdateProfileDto) {
        const imagePath = image.path;
        return this.profileService.updateProfileService(id, imagePath, updateProfileDto);
    }


}

