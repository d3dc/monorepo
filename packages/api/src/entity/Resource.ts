import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm';
  import { Length } from 'class-validator';
  import { Point } from 'geojson'
  import { User } from './User'
  
  @Entity()
  export class Resource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 100)
    name: string
  
    @Column({
      type: 'geometry',
      nullable: true,
      spatialFeatureType: 'Point',
      srid: 4326
    })
    position: Point;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.resources, { nullable: true })
    user: User;
  }
  