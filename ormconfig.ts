import { DataSource } from 'typeorm';
require('dotenv').config();

const typeOrmConfig = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  migrations: ['dist/src/migration/**/*.js'],
  entities: ['dist/**/*.entity.js'],
});

export default typeOrmConfig;
