import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

import { AbstractEntity, UserType } from '@core/models/base-entity';

@Entity('users')
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  username: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
  })
  type: UserType;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  profile_image: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;
}
