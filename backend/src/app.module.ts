import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app.config';
import { jwtConfig } from './config/jwt.config';
import { dbConfig } from './config/db.config';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { wsConfig } from './config/ws.config';
import { LoggingMiddleware } from './logger/logging.middleware';
import { ModelsModule } from './modules/models/models.module';
import { SimulationModule } from './modules/simulation/simulation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, dbConfig, wsConfig],
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [jwtConfig.KEY],
      useFactory: (cfg) => ({
        secret: cfg.accessSecret,
        signOptions: {
          expiresIn: cfg.accessExpiresIn as JwtSignOptions['expiresIn'],
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (cfg) => cfg,
    }),
    UsersModule,
    AuthModule,
    ModelsModule,
    SimulationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
