import { Http } from '@angular/http';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';
import { Injectable } from '@angular/core'

@Injectable()
export class AgendamentoService {

    constructor(private _http: Http, private _dao: AgendamentoDao) {}

    private _montaUri(agendamento: Agendamento) {

        return `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
    }

    agenda(agendamento: Agendamento) {
    
        let api = this._montaUri(agendamento);
        
        return this._dao.ehAgendamentoDuplicado(agendamento)
        .then(existe => {
            if(existe) throw new Error('Agendamento já existente');
            return this._http
                .get(api)
                .toPromise()
                .then(() => agendamento.confirmado = true, err => console.log(err))//ES2015 se sucesso true, se não console.log *o then sempre pode receber 2 callbacks o de sucesso e o de tratamento de erro
                .then(() => this._dao.salva(agendamento))
                .then(() => agendamento.confirmado);
        });
    }

    reagenda(agendamento: Agendamento) {

            let api = this._montaUri(agendamento);
            return this._http
                .get(api)
                .toPromise()
                .then(() => agendamento.confirmado = true, err => console.log(err))
                .then(() => this._dao.salva(agendamento))
                .then(() => agendamento.confirmado);

    }

}