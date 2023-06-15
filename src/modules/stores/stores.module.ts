import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Stores } from './entities/stores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from './store.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Stores])],
  controllers: [StoresController],
  providers: [StoresService, StoreRepository],
  exports: [StoreRepository],
})
export class StoresModule {}
