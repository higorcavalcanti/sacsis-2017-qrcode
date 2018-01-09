import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';

// Providers
import {MinicursosProvider} from "../../providers/minicursos-provider";

// Pages
import {LeitorPage} from "../leitor/leitor";

@Component({
  selector: 'page-minicursos',
  templateUrl: 'minicursos.html',
})
export class MinicursosPage {

  minicursos: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public minicursosProvider: MinicursosProvider) {

    let loader = this.loadingCtrl.create({
      content: "Carregando minicursos...",
      duration: 10000
    });
    loader.present();

    this.minicursosProvider.getAll().then(
      (minicursos) => {
        loader.dismiss();
        console.log('Minicursos carregados', minicursos);
        this.minicursos = minicursos;
      },
      err => {
        loader.dismiss();
        console.log('Falha', err);
      }
    )
  }

  selecionar(m) {
    this.navCtrl.push(LeitorPage, {
      type: "minicurso",
      minicurso: m
    });
  }

}
