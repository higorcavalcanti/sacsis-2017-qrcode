import {Component} from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';

// Providers
import { AuthProvider } from "../../providers/authProvider";

// Pages
import {HomePage} from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account: { email: string, password: string } = {
    email: 'admin@admin.com',
    password: 'admin'
  };

  constructor(private navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private auth: AuthProvider) {
  }


  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();

    this.auth.login(this.account).then(
      () => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      (err) => {
        loading.dismiss();
        this.toastCtrl.create({
          message: "Não foi possível entrar na sua conta. Verifique seus dados e tente novamente.",
          duration: 3000,
          position: 'top'
        }).present();
      }
    );
  }
}
