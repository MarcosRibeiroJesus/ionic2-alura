//Esse é o módulo principal do app. É o primeiro a ser carregado quando a aplicação sobe
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EscolhaPage } from '../pages/escolha/escolha';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from "../pages/perfil/perfil";
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';
import { AgendamentoService } from '../domain/agendamento/agendamento-service';
import { UsuarioService } from "../domain/usuario/usuario-service";
//Ativa o serviço do Storage para facilitar a comunicação com o indexeddb
import { Storage } from '@ionic/storage';
import { AgendamentoDao } from '../domain/agendamento/agendamento-dao';
//ativa o map para realizar as requisições assíncronas, pega a resposta do http e transforma em Json 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//Config do Storage para retornar uma instância configurada 
function provideStorage() {

  return new Storage(['indexeddb', 'sqlite'], {
    name: 'mrjcar',
    storeName: 'agendamentos'//representa uma tabela no campo
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage,
    LoginPage,
    PerfilPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage,
    LoginPage,
    PerfilPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AgendamentoService,
    { provide: Storage, useFactory: provideStorage },//Objeto JS que será injetado sempre que for chamado
    AgendamentoDao,
    UsuarioService
  ]
})
export class AppModule {}
