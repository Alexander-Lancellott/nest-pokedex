import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from 'config/env.config';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfiguration] }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    MongooseModule.forRoot(configService.getOrThrow<string>('mongodb')),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
