import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { UserDetails } from 'src/user/interface/user-default.interface';
import { ExistingUserDTO } from 'src/user/dto/existing-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: ExistingUserDTO): Promise<{ token: string | null }> {
    return this.authService.login(user);
  }
}
