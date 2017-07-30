import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { HomePage } from '../home/home';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';
import { Vibration } from "ionic-native";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public agendamento: Agendamento;

  private _alerta: Alert;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _service: AgendamentoService,
    private _alertCtrl: AlertController) {

    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');

    this.agendamento = new Agendamento(this.carro, this.precoTotal)

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok', handler: () => this.navCtrl.setRoot(HomePage)}]
    });
  }

  agenda() {

    if (!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email || !this.agendamento.data) {

      Vibration.vibrate(400);

      this._alertCtrl.create({
        title: 'Preenchimento Obrigatório',
        subTitle: 'Preencha todos os campos!',
        buttons: [{ text: 'Ok'}]
      }).present();
      
      return;
    }

    this._service
        .agenda(this.agendamento)
        .then(confirmado => {

          confirmado ? //if ternário
            this._alerta.setSubTitle('Agendamento realizado com sucesso.') : //sucesso
            this._alerta.setSubTitle('Não foi possível realizar o agendamento!'); //fracasso
          this._alerta.present(); //será apresentado independente de success or fail

        })
        .catch(err => {
          console.log(err);
          this._alerta.setSubTitle(err.message);
          this._alerta.present();
        })
  }
}
