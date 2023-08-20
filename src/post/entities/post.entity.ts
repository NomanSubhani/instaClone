import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hashtags } from './hashtags.entity';


@Entity('Post')
export class Post {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: 'No Title',
    })
    title: string;

    @Column({
        type: 'numeric', precision: 10, scale: 2,
        nullable: false,
        default: 0,
    })
    longitude: number;

    @Column({
        type: 'numeric', precision: 10, scale: 2,
        nullable: false,
        default: 0,
    })
    latitude: number;

    @Column({
        nullable: true,
        array: true,
        default: '{}',
        type: 'text'
    })
    photos: string[];

    @Column({
        nullable: false,
    })
    userId: number;

    @Column({
        nullable:true,
        default:1
    })
    isActive:number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => User, user => user.post, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ManyToMany(() => Hashtags, hashtag => hashtag.post)
    hashtag: Hashtags[]

}