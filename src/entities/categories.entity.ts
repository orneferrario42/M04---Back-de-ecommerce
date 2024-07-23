import {Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany} from 'typeorm';
import { Product } from './product.entity';
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'categories',
})
export class Categorie {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn()
    product: Product[];
}
