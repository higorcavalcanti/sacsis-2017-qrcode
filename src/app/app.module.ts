import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {IonicStorageModule} from "@ionic/storage";
import {MyApp} from './app.component';

// @ionic-native
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

// Outros Imports
import {JwtHelper, AuthConfig, AuthHttp} from "angular2-jwt";

// Providers
import {Api} from '../providers/api';
import {Database} from "../providers/database";
import {AuthProvider} from "../providers/authProvider";
import {UsersProvider} from "../providers/users-provider";
import {PalestrasProvider} from "../providers/palestras-provider";
import {MinicursosProvider} from "../providers/minicursos-provider";

// Paginas
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";

import {LeitorPage} from "../pages/leitor/leitor";
import {PalestrasPage} from "../pages/palestras/palestras";
import {MinicursosPage} from "../pages/minicursos/minicursos";


export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Database) {
  const authConfig = new AuthConfig({
    tokenGetter: (() => storage.get('jwt_token')),
    globalHeaders: [{'Accept': 'application/json'}],
  });
  return new AuthHttp(authConfig, http, options);
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LeitorPage,
    PalestrasPage,
    MinicursosPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LeitorPage,
    PalestrasPage,
    MinicursosPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    // Plugins
    StatusBar,
    SplashScreen,
    BarcodeScanner,

    // JWT
    JwtHelper,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Database]
    },

    // Meus
    Api,
    AuthProvider,
    Database,
    UsersProvider,
    PalestrasProvider,
    MinicursosProvider,
  ]
})
export class AppModule {
}
