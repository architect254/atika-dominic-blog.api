import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@core/models/base-entity';

@Entity('author')
export class Author extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  about_title: string;

  @Column({ nullable: false })
  about_description: string;

  @Column({ nullable: false })
  profile_image: string;

  @Column({ nullable: false })
  contact_title: string;

  @Column({ nullable: false })
  contact_description: string;

  @Column({ nullable: false })
  contact_email: string;

  @Column({ nullable: false })
  facebook_profile: string;

  @Column({ nullable: false })
  twitter_profile: string;

  @Column({ nullable: false })
  whatsapp_profile: string;
}
