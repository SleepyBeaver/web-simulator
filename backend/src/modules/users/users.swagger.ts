import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordDto } from '../../auth/dto/password.dto';

export const ApiFindAllUsers = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить список всех пользователей',
      description: 'Возвращает список всех зарегистрированных пользователей',
    }),
    ApiResponse({
      status: 200,
      description: 'Список пользователей',
      type: [User],
    }),
  );

export const ApiGetMe = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Получить профиль текущего пользователя',
      description: 'Возвращает профиль аутентифицированного пользователя',
    }),
    ApiResponse({
      status: 200,
      description: 'Профиль пользователя',
      type: User,
    }),
    ApiResponse({
      status: 401,
      description: 'Не авторизован',
    }),
  );

export const ApiGetUser = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить пользователя по ID',
      description: 'Возвращает информацию о пользователе по его UUID',
    }),
    ApiParam({
      name: 'id',
      description: 'UUID пользователя',
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    ApiResponse({
      status: 200,
      description: 'Информация о пользователе',
      type: User,
    }),
    ApiResponse({
      status: 404,
      description: 'Пользователь не найден',
    }),
  );

export const ApiUpdateMe = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Обновить профиль текущего пользователя',
      description:
        'Позволяет обновить имя текущего аутентифицированного пользователя',
    }),
    ApiBody({
      type: UpdateUserDto,
      description: 'Данные для обновления профиля пользователя',
    }),
    ApiResponse({
      status: 200,
      description: 'Обновленный профиль пользователя',
      type: User,
    }),
    ApiResponse({
      status: 400,
      description: 'Некорректные данные для обновления',
    }),
    ApiResponse({
      status: 401,
      description: 'Не авторизован',
    }),
  );

export const ApiUpdatePassword = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Обновить пароль текущего пользователя',
      description:
        'Позволяет изменить пароль аутентифицированного пользователя',
    }),
    ApiBody({
      type: PasswordDto,
      description: 'Текущий и новый пароли пользователя',
    }),
    ApiResponse({
      status: 200,
      description: 'Пароль успешно обновлен',
    }),
    ApiResponse({
      status: 400,
      description: 'Некорректные данные для обновления пароля',
    }),
    ApiResponse({
      status: 401,
      description: 'Не авторизован',
    }),
  );
