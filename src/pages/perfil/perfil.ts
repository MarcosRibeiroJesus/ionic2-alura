import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from "../../domain/usuario/usuario-service";

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage implements OnInit {

  public url: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _UsuarioService: UsuarioService) {}

  get usuarioLogado() {

    return this._UsuarioService.obtemUsuarioLogado();
  }

  ngOnInit(){

    this.url = this._UsuarioService.obtemAvatar();
  }
}
