import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('Profile')
export class Profile {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    address: string;

    @Column({
        name: 'phone',
        nullable: false,
        default: '',
    })
    phone: string;

    @Column({
        nullable: false,
        default: '',
    })
    age: string;

    @Column({
        nullable:true,
        default:'',
    })
    photo:string;

    @Column({
        nullable:false,
    })
    userId:number;

    @OneToOne(()=>User,user=>user.profile,{onDelete:'CASCADE'})
    @JoinColumn()
    user:User;

}