import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConsumoEnergiaController } from './consumo_energia/consumo_energia.controller';
import { ConsumoEnergiaService } from './consumo_energia/consumo_energia.service';

@Module({
  controllers: [ConsumoEnergiaController],
  providers: [ConsumoEnergiaService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();