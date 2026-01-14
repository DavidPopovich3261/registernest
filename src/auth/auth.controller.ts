
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Userdto } from './auth.DTO';
import { AuthGuard  } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private AuthService:AuthService
  ) { }

  @Post('register')
  register(@Body(ValidationPipe)user:Userdto){
    return this.AuthService.register(user)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.AuthService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
