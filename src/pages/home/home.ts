import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LeitorPage } from "../leitor/leitor";
import { PalestrasPage } from "../palestras/palestras";
import { MinicursosPage } from "../minicursos/minicursos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  coffe() {
    this.navCtrl.push( LeitorPage, {
      data: 'coffee'
    });
  }

  minicursos() {
    this.navCtrl.push( MinicursosPage );
  }

  palestras() {
    this.navCtrl.push( PalestrasPage );
  }
}
