
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'rootpassword',
      database: 'mydb',
      autoLoadModels: true,
      synchronize: true, 
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
