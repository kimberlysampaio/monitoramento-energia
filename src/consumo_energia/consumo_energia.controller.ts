import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { ConsumoEnergia } from './consumo_energia.model';

@Controller('consumo')
export class ConsumoEnergiaController {
  constructor(private readonly service: ConsumoEnergiaService) {}

  @Post()
  registrar(@Body() dados: ConsumoEnergia) {
    return this.service.registrarConsumo(dados);
  }

  @Get('historico')
  consultar(
    @Query('usuarioId') usuarioId: string,
    @Query('inicio') inicio: string,
    @Query('fim') fim: string
  ) {
    return this.service.consultarHistorico(usuarioId, new Date(inicio), new Date(fim));
  }

  @Get('alerta')
  alerta(@Query('usuarioId') usuarioId: string) {
    return this.service.verificarAlerta(usuarioId);
  }
}