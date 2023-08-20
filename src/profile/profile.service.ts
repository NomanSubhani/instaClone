import { CreateProfileDto } from './dto/create-profile.dto';
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) { }

    async createProfileService(userId: number, imagePath, createProfileDto: CreateProfileDto): Promise<Profile> {
        try {

            let profile: Profile = new Profile();
            // createProfileDto.photo=imagePath          
            profile.address = createProfileDto.address;
            profile.phone = createProfileDto.phone;
            profile.age = createProfileDto.age;
            profile.photo = imagePath;
            profile.userId = userId;
            return await this.profileRepository.save(profile);
        } catch (e) {
            console.log("error", e);
            throw e;
        }
    }

    async updateProfileService(id: number, imagePath, updateProfileDto: UpdateProfileDto) {

        return await this.profileRepository
            .createQueryBuilder()
            .update()
            .set({
                address: updateProfileDto.address,
                phone: updateProfileDto.phone,
                age: updateProfileDto.age,
                photo: imagePath,
            })
            .where('id = :id', { id })
            .execute()
    }

    async findAllProfiles(): Promise<Profile[]> {
        return await this.profileRepository.find();
    }
}