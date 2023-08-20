import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profile/entities/profile.entity";
import { Post } from "src/post/entities/post.entity";
import { Hashtags } from "src/post/entities/hashtags.entity";
import { Exclude } from "class-transformer";


@Entity('User')
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    username: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: '',
    })
    email: string;

    // @Exclude()
    @Column({
        // select: false ,
        nullable: false,
    })
    password: string;

    // constructor(partial: Partial<User>) {
    //     Object.assign(this, partial);
    //   }

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;

    @OneToMany(() => Post, post => post.user)
    post: Post[];

    @OneToMany(() => Hashtags, hashtag => hashtag.user)
    hashtag: Hashtags[];
}