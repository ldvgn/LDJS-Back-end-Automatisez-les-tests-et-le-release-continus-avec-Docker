import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { WorkshopsModule } from "@modules/workshops/workshops.module";
import { NotionsModule } from "@modules/notions/notions.module";
import { HealthController } from "@core/health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>("MONGO_URI"),
      }),
    }),
    WorkshopsModule,
    NotionsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
