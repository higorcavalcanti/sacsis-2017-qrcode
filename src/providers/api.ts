import {Injectable} from '@angular/core';
import {Http, Request, RequestOptions, RequestMethod, Headers} from '@angular/http';
import {AuthHttp} from "angular2-jwt";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {

  //private API_URL: string = "http://10.0.0.1:8765/api/v1/";
  //private API_URL: string = "http://10.0.0.11:8765/api/presenca/";
  private API_URL: string = "/api2/";
  //private API_URL: string = "http://sacsis.infoalto.com.br/api/presenca/";

  constructor(private http: Http, private authHttp: AuthHttp) {

  }

  private request(url: string, method: RequestMethod, body: any, notSecure?: boolean) {

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append("Content-Type", 'application/json');

    let requestoptions = new RequestOptions({
      method: method,
      url: this.API_URL + url,
      headers: headers,
      body: JSON.stringify(body),
    });

    let http;
    if(notSecure) http = this.http;
    else http = this.authHttp;

    return http.request(new Request(requestoptions))
      .timeout(5000)
      .map(res => res.json());
  }

  public get(url: string, notSecure?: boolean) {
    return this.request(url, RequestMethod.Get, {}, notSecure);
  }

  public post(url: string, body: any, notSecure?: boolean) {
    return this.request(url, RequestMethod.Post, body, notSecure);
  }

  public put(url: string, body: any, notSecure?: boolean) {
    return this.request(url, RequestMethod.Put, body, notSecure);
  }

  public delete(url: string, notSecure?: boolean) {
    return this.request(url, RequestMethod.Post, {}, notSecure);
  }

  public patch(url: string, body: any, notSecure?: boolean) {
    return this.request(url, RequestMethod.Patch, body, notSecure);
  }

  public head(url: string, notSecure?: boolean) {
    return this.request(url, RequestMethod.Head, {}, notSecure);
  }

  public options(url: string, notSecure?: boolean) {
    return this.request(url, RequestMethod.Options, {}, notSecure);
  }

}
