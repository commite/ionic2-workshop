import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Config} from 'ionic-angular';

@Injectable()
export class LoftsmartAPI {

  storage = window.localStorage;
  endpoint: string;
  http: Http;
  userLoggedIn: EventEmitter<any> = new EventEmitter();
  userLoggedOut: EventEmitter<any> = new EventEmitter();

  constructor(config: Config, http: Http) {
    console.log('Calling API constructor');
    this.http = http;
    this.endpoint = config.get('apiEndpoint');
  }

  getToken() {
    return this.storage.getItem('token');
  }

  setToken(token) {
    this.storage.setItem('token', token);
  }

  isLogged() {
    return this.getToken() !== null;
  }

  request(method, path, data): Observable<any> {
    console.log('API: ' + RequestMethod[method] + ' ' + path);
    let headers = {
          'Content-Type': 'application/json'
    };
    if (this.isLogged()) {
        headers['Authorization'] = 'Token ' + this.getToken();
    }
    let options = new RequestOptions({
      method: method,
      url: this.endpoint + path,
      headers: new Headers(headers),
      body: JSON.stringify(data)});
    return this.http.request(this.endpoint + path, options).map(res => res.json());
  }

  get(path, data?): Observable<any> {
    return this.request(RequestMethod.Get, path, {});
  }

  post(path, data?): Observable<any> {
    return this.request(RequestMethod.Post, path, data);
  }

  patch(path, data?): Observable<any> {
    return this.request(RequestMethod.Patch, path, data);
  }

  put(path, data?): Observable<any> {
    return this.request(RequestMethod.Put, path, data);
  }

  login(email, password) {
    let self = this;
    let req = this.post('/api-token-auth/',
                        {'username': email, 'password': password});
    return new Promise(function(resolve, reject) {
      req.subscribe(
        res => {
          let token = res.token;
          console.log('Get auth token ' + token);
          self.setToken(token);
          self.userLoggedIn.emit(this);
          resolve();
        },
        err => {
          console.error(err);
          reject(err);
        });
    });
  }

  logout() {
    this.storage.removeItem('token');
    this.userLoggedOut.emit(this);
  }

  getProperties(): Observable<any> {
    return this.get('/schools/rest/property/search/?place=95696c0b-409f-448b-ab25-6843b20bd625&expand=landlord,main_place,neighborhood&ne_lat=30.656192647212325&ne_lng=-96.33408832275393&sw_lat=30.54389804753594&sw_lng=-96.40979098999026&page=1&sort=-_reviews_number');
  }
}
