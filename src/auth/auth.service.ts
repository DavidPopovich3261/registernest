
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Userdto } from './auth.DTO';
import { users } from './auth.users.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(users)
    private readonly userModel: typeof users,
    private jwtService: JwtService,
  ) { }

  async register(user:Userdto) {
    const passwordhash = await bcrypt.hash(user.password, 10);
    return await this.userModel.create<users>({ username: user.username, password: passwordhash })
  }

  async signIn(username: string, pass: string,): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne<users>({ where: { username: username }});    
    if (user == undefined) throw new UnauthorizedException();
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = {username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
