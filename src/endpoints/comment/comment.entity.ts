import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { AbstractEntity } from '@core/models/base-entity';

import { Article } from '@endpoints/article/article.entity';

@Entity('comments')
export class Comment extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => Article, { nullable: false })
  @JoinColumn()
  article: Article;

  @Column({ nullable: false })
  article_id: string;
}
