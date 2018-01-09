import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

@Injectable()
export class Database {

  constructor(private storage: Storage) {

  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.storage.set(key, JSON.stringify(value) )
        .then(
          () => {
            console.log('Database > set > ', key, value);
            resolve(true);
          },
          error => {
            console.error('Database > set > ', key, value, error);
          }
        );
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.storage.get(key)
        .then(
          (data: any) => {
            let parsed = JSON.parse(data);
            console.log('Database > get > ', key, data);
            resolve(parsed);
          },
          (error: any) => {
            console.error('Database > get > ', key, error);
          }
        );
    });
  }

  clear() {
    return this.storage.clear();
  }
}
