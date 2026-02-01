import { ConfigType } from '@nestjs/config';
import { appConfig } from './app.config';
import { jwtConfig } from './jwt.config';
import { dbConfig } from './db.config';

export type IAppConfig = ConfigType<typeof appConfig>;
export type IJwtConfig = ConfigType<typeof jwtConfig>;
export type IDbConfig = ConfigType<typeof dbConfig>;
