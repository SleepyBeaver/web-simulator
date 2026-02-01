import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { AuthRequest } from '../../auth/types';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordDto } from '../../auth/dto/password.dto';
import { UUID } from 'crypto';
import {
  ApiFindAllUsers,
  ApiGetMe,
  ApiGetUser,
  ApiUpdateMe,
  ApiUpdatePassword,
} from './users.swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiFindAllUsers()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiGetMe()
  async getMe(@Req() req: AuthRequest): Promise<User> {
    return this.usersService.findOneById(req.user.sub);
  }

  @Get(':id')
  @ApiGetUser()
  async findOne(@Param('id', ParseUUIDPipe) id: UUID): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ApiUpdateMe()
  async updateMe(
    @Req() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(req.user.sub, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  @ApiUpdatePassword()
  async updatePassword(
    @Req() req: AuthRequest,
    @Body() updatePasswordDto: PasswordDto,
  ) {
    return this.usersService.updatePassword(
      req.user.sub,
      updatePasswordDto.currentPassword,
      updatePasswordDto.newPassword,
    );
  }
}
