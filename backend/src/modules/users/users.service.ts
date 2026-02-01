import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { appConfig } from '../../config/app.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) { }

  async findOneById(id: UUID): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: UUID, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateData,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async updatePassword(id: UUID, oldPassword: string, newPassword: string) {
    const user = await this.findOneById(id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (isMatch) {
      const hashedNewPassword = await bcrypt.hash(
        newPassword,
        this.config.bcryptSalt,
      );
      await this.userRepository.update(id, { password: hashedNewPassword });
      return { message: 'Пароль успешно обновлен' };
    } else {
      throw new BadRequestException('Старый пароль не совпадает');
    }
  }
}
