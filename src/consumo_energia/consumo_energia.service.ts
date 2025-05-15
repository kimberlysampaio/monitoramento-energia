import { Injectable } from '@nestjs/common';
import { ConsumoEnergia } from './consumo_energia.model';
import { randomUUID } from 'crypto';

@Injectable()
export class ConsumoEnergiaService {
  private consumos: ConsumoEnergia[] = [];

  registrarConsumo(dados: ConsumoEnergia) {
    dados.id = randomUUID();
    this.consumos.push(dados);
    return dados;
  }

  consultarHistorico(usuarioId: string, inicio: Date, fim: Date) {
    return this.consumos.filter(
      c => c.usuarioId === usuarioId &&
           c.dataLeitura >= inicio &&
           c.dataLeitura <= fim
    );
  }

  verificarAlerta(usuarioId: string) {
    const registros = this.consumos
      .filter(c => c.usuarioId === usuarioId)
      .sort((a, b) => a.dataLeitura.getTime() - b.dataLeitura.getTime());

    if (registros.length < 2) return null;

    const ultimo = registros[registros.length - 1];
    const penultimo = registros[registros.length - 2];

    if (ultimo.energiaConsumida > penultimo.energiaConsumida) {
      return {
        alerta: true,
        mensagem: `Consumo elevado: ${ultimo.energiaConsumida}kWh comparado a ${penultimo.energiaConsumida}kWh.`
      };
    }

    return { alerta: false };
  }
}