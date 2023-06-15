import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      synchronize: false,
      logging: true,
      migrations: ['dist/src/migration/**/*.js'],
      entities: ['dist/**/*.entity.js'],
      // migrations: process.env.ENVIROMENT === 'development' ? ['./' + migrations] : ['./dist/' + migrations],
      // entities: process.env.ENVIROMENT === 'development' ? ['./src/' + entities] : ['./dist/' + entities],
      // autoLoadEntities: true
    };
  },
};
