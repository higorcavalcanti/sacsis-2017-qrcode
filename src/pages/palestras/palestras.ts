import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';

// Providers
import {PalestrasProvider} from "../../providers/palestras-provider";

// Pages
import {LeitorPage} from "../leitor/leitor";

@Component({
  selector: 'page-palestras',
  templateUrl: 'palestras.html',
})
export class PalestrasPage {

  palestras: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public palestrasProvider: PalestrasProvider) {

    let loader = this.loadingCtrl.create({
      content: "Carregando palestras...",
      duration: 10000
    });
    loader.present();

    this.palestrasProvider.getAll().then(
      (palestras) => {
        loader.dismiss();
        console.log('Palestras carregadas', palestras);
        this.palestras = palestras;
      },
      err => {
        loader.dismiss();
        console.log('Falha', err);
      }
    )
  }

  selecionar(p) {
    this.navCtrl.push(LeitorPage, {
      type: "palestra",
      palestra: p
    });
  }

}
