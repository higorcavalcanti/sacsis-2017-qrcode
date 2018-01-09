import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class MinicursosProvider {

  constructor(private api: Api) {
  }

  getAll() {
    return new Promise( (resolve, reject) => {
      this.api.get('minicursos').subscribe(
        (data) => {
          resolve(data.minicursos);
        },
        err => {
          console.log('Falha ao obter minicursos', err);
          reject(err);
        }
      )
    });
  }

  presenca(turma_id, user_id) {
    return new Promise( (resolve, reject) => {
      this.api.post('minicursos/presenca/' + turma_id, {user_id: user_id}).subscribe(
        (data) => {
          resolve(data);
        },
        err => {
          console.log('Falha ao registrar usuário no minicurso', err);
          reject(err);
        }
      )
    });
  }
}
