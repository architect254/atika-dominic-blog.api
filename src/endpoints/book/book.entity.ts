import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@core/models/base-entity';

@Entity('books')
export class Book extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  themes: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: false })
  cost: number;
}
