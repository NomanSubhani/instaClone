import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { Hashtags } from './entities/hashtags.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        @InjectRepository(Hashtags)
        private readonly hashtagsRepository: Repository<Hashtags>
    ) { }

    async createPostService(imagesPath, createPostDto: CreatePostDto): Promise<Post> {
        try {
            let post: Post = new Post();
            let hashtag: Hashtags = new Hashtags();
            post.title = createPostDto.title;
            post.longitude = createPostDto.longitude;
            post.latitude = createPostDto.latitude;
            post.photos = imagesPath;
            post.userId = createPostDto.userId;
            console.log(imagesPath)
            const postData = await this.postRepository.save(post);
            hashtag.userId = postData.userId;
            hashtag.hashtags = createPostDto.hashtag;
            hashtag.postId = postData.id;
            await this.hashtagsRepository.save(hashtag);
            return postData;
        } catch (e) {
            console.log("error", e);
            throw e;
        }
    }

    async updatePostService(id: number, imagesPath, updatePostDto: UpdatePostDto) {

        const postData = await this.postRepository
            .createQueryBuilder()
            .update()
            .set({
                title: updatePostDto.title,
                longitude: updatePostDto.longitude,
                latitude: updatePostDto.latitude,
                photos: imagesPath,
                userId: updatePostDto.userId
            })
            .where('id = :id', { id })
            .execute();

        await this.hashtagsRepository
            .createQueryBuilder()
            .update()
            .set({
                hashtags: updatePostDto.hashtag,
                userId: updatePostDto.userId
            })
            .where('postId=:id', { id })
            .execute();
        return postData;
    }

    async changeActiveCol() {
        let activeStatus = await this.postRepository.find({
            select: ['createdAt', 'isActive']
        });
        for (const status of activeStatus) {
            if (activeStatus.filter(active => active.isActive == 1) && ((new Date().getTime() - status.createdAt.getTime()) / 1000 * 60) > 10) {
                status.isActive = 0;
                await this.postRepository
                    .createQueryBuilder()
                    .update()
                    .set({
                        isActive: status.isActive
                    })
                    .execute()
                console.log(status);
            }
        }
    }

    async allStories() {
        let allPostStory = await this.postRepository.find({
            select: ['id', 'isActive', 'photos', 'userId']
        });
        var filterStatusArr = [];

        for (const st of allPostStory.filter(ele => ele.isActive == 1)) {
            // for (const pic of st?.photos) {
            //     return st.photos;
            // }
            filterStatusArr.push({ id: st.id, photos: st.photos, userId: st.userId })
        }
        return filterStatusArr;
    }

    async findAllPosts(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    async userStory(id: number, filterStatusArr: Array<any>) {
        console.log(filterStatusArr);
        
        // let story = null;
        // for (const ele of filterStatusArr) {
        //     console.log(typeof id)
        //     console.log(typeof ele.id)
        //     if (ele.id == id) {
        //         story = ele;
        //         break;
        //     }
        // }
        
        let story = filterStatusArr.find(ele=>ele.id==id);
        console.log(story);
        return story;
    }
}