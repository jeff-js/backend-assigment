import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { IssuesModule } from './issues/issues.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('databaseMongodb'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    IssuesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
