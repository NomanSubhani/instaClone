import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from './post.entity';
import { User } from "src/user/entities/user.entity";


@Entity('Hashtags')
export class Hashtags {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    hashtags: string;

    @Column({
        nullable:false,
    })
    userId:number;

    @Column({
        nullable:false,
    })
    postId:number;

    @ManyToMany(() => Post, post => post.hashtag, { onDelete: 'CASCADE' })
    @JoinColumn()
    post: Post[];

    @ManyToOne(() => User, user => user.hashtag, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    
}