import { Stores } from '../../stores/entities/stores.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Ads {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Stores, (store) => store.ads)
  @JoinColumn({ name: 'shopify_store_id' })
  store: Stores;

  @Column({ type: "bigint" })
  shopify_product_id: number;

  @Column()
  text: string;

  @Column({ default: false })
  is_saved: boolean; // default = 0

  @Column({ default: false })
  is_disliked: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
