import { UpdatePostDto } from './dto/update-post.dto';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
    Body, Controller, FileTypeValidator,
    Get, Param, ParseFilePipe, Post, Put,
    UploadedFiles, UseInterceptors
} from "@nestjs/common";
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';


@Controller('posts')
export class PostController {
    constructor(private postService: PostService) { }

    @Get('/findPosts')
    getAllPosts() {
        return this.postService.findAllPosts();
    }

    @Post('/add')
    @UseInterceptors(FilesInterceptor('images', 3, {
        storage: diskStorage({
            destination: 'src/post/uploads',
            filename: (req, file, cb) => {
                return cb(null, `${file.originalname}`)
            }
        })
    }))
    addPost(@UploadedFiles(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    })) images: Express.Multer.File[], @Body() createPostDto: CreatePostDto) {
        const imagePaths = [];
        for (const image of images) {
            const imagePath = image.path
            imagePaths.push(imagePath);
        }
        // console.log(imagePaths)
        return this.postService.createPostService( imagePaths, createPostDto);
    }

    @Put('/update/:id')
    @UseInterceptors(FilesInterceptor('images', 3, {
        storage: diskStorage({
            destination: 'src/post/uploads',
            filename: (req, file, cb) => {
                return cb(null, `${file.originalname}`)
            }
        })
    }))
    updateProfile(@Param('id') id: number, @UploadedFiles(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    })) images: Express.Multer.File[], @Body() updatePostDto: UpdatePostDto) {
        const imagePaths = [];
        for (const image of images) {
            const imagePath = image.path
            imagePaths.push(imagePath);
        }
        return this.postService.updatePostService(id, imagePaths, updatePostDto);
    }

    @Get('/onePost/:id')
    async getOne(@Param('id') idObject:number /* or @Param('id) idObject: { id: number }*/){
        // const id = idObject.id;
        const id=Number(idObject);
        let filterStatusArr=await this.postService.findAllPosts()
        return await this.postService.userStory(id,filterStatusArr)
    }

    @Get('/allPostStory')
    async getAllStory(){
        return this.postService.allStories();
    }

}

