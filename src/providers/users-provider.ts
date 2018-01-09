import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class UsersProvider {

  constructor(private api: Api) {
  }

  get(id) {
    return new Promise( (resolve, reject) => {
      this.api.get('user/view/' + id).subscribe(
        (data) => {
          resolve(data.user);
        },
        err => {
          console.log('Falha ao obter usuario', err);
          reject(err);
        }
      )
    });

  }
}
