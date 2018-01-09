import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class PalestrasProvider {

  constructor(private api: Api) {
  }

  getAll() {
    return new Promise( (resolve, reject) => {
      this.api.get('palestras').subscribe(
        (data) => {
          resolve(data.palestras);
        },
        err => {
          console.log('Falha ao obter palestras', err);
          reject(err);
        }
      )
    });
  }

  presenca(palestra_id, user_id) {
    return new Promise( (resolve, reject) => {
      this.api.post('palestras/presenca/' + palestra_id, {user_id: user_id}).subscribe(
        (data) => {
          resolve(data);
        },
        err => {
          console.log('Falha ao registrar usuário na palestra', err);
          reject(err);
        }
      )
    });
  }
}
