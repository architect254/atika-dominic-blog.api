import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@core/models/base-entity';

@Entity('author')
export class Author extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  nickname: string;

  @Column({ nullable: false })
  education: string;

  @Column({ nullable: false })
  interests: string;

  @Column({ nullable: false })
  accomplishments: string;

  @Column({ nullable: false })
  expertise: string;

  @Column({ nullable: false })
  residence: string;

  @Column({ nullable: false })
  about_info: string;

  @Column({ nullable: false })
  facebook_profile: string;

  @Column({ nullable: false })
  twitter_profile: string;

  @Column({ nullable: false })
  whatsapp_profile: string;
}
