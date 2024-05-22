import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { ExistingUserDTO } from 'src/user/dto/existing-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';
import { AgentService } from 'src/agent/agent.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private agentService: AgentService,
    private jwtService: JwtService,
  ) {}

  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: NewUserDTO): Promise<any> {
    const {
      name,
      email,
      password,
      budget,
      minArea,
      minBathrooms,
      minBedrooms,
      phone,
      isAgent,
      agencyID,
      commission,
    } = user;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) return 'Email already exist!';

    const hashedPassword = await this.hashedPassword(password);

    const newUser = await this.userService.create(name, email, hashedPassword);

    if (isAgent) {
      await this.agentService.create({
        agencyID,
        name,
        email,
        phone,
        commission,
      });
    } else {
      await this.clientService.create({
        budget,
        email,
        minArea,
        minBathrooms,
        minBedrooms,
        name,
        phone,
      });
    }

    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(password, hashedPassword): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async login(existingUser: ExistingUserDTO): Promise<any> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) throw new UnauthorizedException();

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }
}
