import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult} from '@ionic-native/barcode-scanner';

import {UsersProvider} from "../../providers/users-provider";
import {PalestrasProvider} from "../../providers/palestras-provider";
import {MinicursosProvider} from "../../providers/minicursos-provider";

@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html',
})
export class LeitorPage {

  result: any;
  pode: boolean;

  type: string;
  item: any;
  title: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public barCode: BarcodeScanner,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public usersProvider: UsersProvider,
              public palestrasProvider: PalestrasProvider,
              public minicursosProvider: MinicursosProvider) {

    this.type = this.navParams.get('type');

    if(this.type == 'palestra') {
      this.item = this.navParams.get('palestra');
      this.title = "Palestra: " + this.item.titulo;
    }
    else if(this.type == 'minicurso') {
      this.item = this.navParams.get('minicurso');
      this.title = "Minicurso: " + this.item.nome;
    }
    else {
      this.type = null;
      this.item = null;
      this.title = "Apenas Verificar";
      this.pode = false;
    }
  }

  registrar() {

    if(this.type == 'minicurso') {
      this.registrarMinicurso();
    }
    else if(this.type == 'palestra') {
      this.registrarPalestra();
    }
  }

  presenca() {

    let message = 'Tem certeza que deseja registrar presença?<br><br>' +
                  '<b>Usuario:</b> ' +this.result.name+ '<br>' +
                  '' +this.title+ '?';

    let confirm = this.alertCtrl.create({
      title: 'Registrar presença?',
      message: message,
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Registrar',
          handler: () => { this.registrar(); }
        }
      ]
    });
    confirm.present();
  }

  async lerQr() {
    console.log('ler');
    let options: BarcodeScannerOptions = {
      prompt: 'Posicione o QRCode na marca',
      formats: 'QR_CODE'
    };
    this.verificar( await this.barCode.scan(options) );
  }

  verificar(result: BarcodeScanResult) {

    if(result.cancelled)
      return;

    if(result.format != 'QR_CODE')
      return;

    if(!this.isSacsisCode(result.text)) {
      this.result = false;
      this.pode = false;

      this.alertCtrl.create({
        title: 'Código inválido!',
        message: 'O código lido é inválido!<br>Código lido: ' + result.text,
        buttons: [{ text: 'Fechar' }]
      }).present();
      return;
    }

    this.loadUser( this.isSacsisCode(result.text) );

    console.log('Codigo lido: ', result.text);
    console.log(result);
  }

  isSacsisCode(text) {
    let arr = text.split(':');
    if(arr.length != 3) return false;
    if(arr[0] != 'sacsis') return false;
    if(arr[1] != '2017') return false;
    return arr[2];
  }





  loadUser(id) {
    this.pode = false;
    this.result = false;

    let loader = this.loadingCtrl.create({
      content: "Carregando usuário...",
      duration: 10000
    });
    loader.present();

    this.usersProvider.get(id).then(
      (user) => {
        loader.dismiss();
        if(user) {
          this.result = user;
          if(this.type == 'minicurso') {
            if(this.result.turma1 == this.item.id || this.result.turma2 == this.item.id) {
              this.pode = true;
            }
            else {
              this.alertCtrl.create({
                title: 'ERROR!',
                message: 'O usuário não tem permissão para acessar este minicurso!',
                buttons: [{ text: 'Fechar' }]
              }).present();
            }
          }
          if(this.type == 'palestra') {
            this.pode = true;
          }
        }
        else {
          this.alertCtrl.create({
            title: 'Error!',
            message: 'Ocorreu um erro ao ler usuário, talvez ele não exista.',
            buttons: [{ text: 'Fechar' }]
          }).present();
        }
      },
      err => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Falha de conexão!',
          message: 'Ocorreu um erro ao obter usuário, talvez você esteja sem internet!',
          buttons: [{ text: 'Fechar' }]
        }).present();
      }
    )
  }



  registrarMinicurso() {
    let loader = this.loadingCtrl.create({
      content: "Registrando presença...",
      duration: 10000
    });
    loader.present();

    this.minicursosProvider.presenca(this.item.id, this.result.id).then(
      (data: any) => {
        loader.dismiss();
        console.log(data);
        if(data.status == 1) {
          this.alertCtrl.create({
            title: 'Sucesso!',
            message: 'Presença registrada com sucesso!',
            buttons: [{ text: 'Fechar' }]
          }).present();
        }
        else {
          let msg = '';

          if(data.statusM) msg = data.statusM
          else msg = 'Erro desconhecido!';

          this.alertCtrl.create({
            title: 'ERROR!',
            message: 'Ocorreu um erro:<br>' + msg,
            buttons: [{ text: 'Fechar' }]
          }).present();
        }
      },
      err => {
        loader.dismiss()
        console.log('Falha minicurso', err);

        this.alertCtrl.create({
          title: 'ERROR!',
          message: 'Falha ao registrar presença, talvez você esteja sem internet!',
          buttons: [{ text: 'Fechar' }]
        }).present();
      }
    )
  }

  registrarPalestra() {
    let loader = this.loadingCtrl.create({
      content: "Registrando presença...",
      duration: 10000
    });
    loader.present();

    this.palestrasProvider.presenca(this.item.id, this.result.id).then(
      (data: any) => {
        loader.dismiss();
        console.log(data);
        if(data.status == 1) {
          this.alertCtrl.create({
            title: 'Sucesso!',
            message: 'Presença registrada com sucesso!',
            buttons: [{ text: 'Fechar' }]
          }).present();
        }
        else {
          let msg = '';

          if(data.statusM) msg = data.statusM
          else msg = 'Erro desconhecido!';

          this.alertCtrl.create({
            title: 'ERROR!',
            message: 'Ocorreu um erro:<br>' + msg,
            buttons: [{ text: 'Fechar' }]
          }).present();
        }
      },
      err => {
        loader.dismiss()
        console.log('Falha palestra', err);

        this.alertCtrl.create({
          title: 'ERROR!',
          message: 'Falha ao registrar presença, talvez você esteja sem internet!',
          buttons: [{ text: 'Fechar' }]
        }).present();
      }
    )
  }

}
