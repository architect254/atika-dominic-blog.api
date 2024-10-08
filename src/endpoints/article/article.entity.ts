import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@core/models/base-entity';

@Entity('articles')
export class Article extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  keywords: string;

  @Column({ nullable: false })
  article_image: string;

  @Column({ nullable: false })
  content: string;
}
