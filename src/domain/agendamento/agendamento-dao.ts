import { Injectable } from '@angular/core';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { Carro } from '../../domain/carro/carro';
import { Storage } from '@ionic/storage';

@Injectable()
export class AgendamentoDao {

    constructor(private _storage: Storage) {}

    private _getKey(agendamento: Agendamento){
        return agendamento.email + agendamento.data.substr(0, 10);//chave única pra gravar no banco *substr para pegar apenas ano, mês e dia excluindo horas, seg, etc
    }

    salva(agendamento: Agendamento) {
        let key = this._getKey(agendamento);
        return this._storage.set(key, agendamento);//grava no banco *o set também é uma promise onde posso encadear um then também, porém utilizaremos um return onde se true, o resultado sera capturado na próxima then
    }

    ehAgendamentoDuplicado(agendamento: Agendamento) {

        let key = this._getKey(agendamento);
        return this._storage
            .get(key)
            .then(dado => {
                return dado ? true : false;
            });
    }

    listaTodos() {

        let agendamentos = [];

        return this._storage.forEach(dado => {
            
            let carro = new Carro(dado.carro.nome, dado.carro.preco);

            let agendamento = new Agendamento(
                carro, 
                dado.valor, 
                dado.nome, 
                dado.endereco, 
                dado.email, 
                dado.data,
                dado.confirmado);

            agendamentos.push(agendamento);

        })
        .then(() => agendamentos);
    }
    
}