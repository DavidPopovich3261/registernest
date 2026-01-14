import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { users } from './auth.users.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'DB/database.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([users]),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: "$2b$10$cfTZZCgoovYnhI39VGgw3eXTOc1GJz7lMSAOiI1QL5OGSM8DNNurO",
      signOptions: { expiresIn: "1h" },
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
