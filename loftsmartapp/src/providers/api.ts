import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Config} from 'ionic-angular';

@Injectable()
export class LoftsmartAPI {

  storage = window.localStorage;
  endpoint: string;
  place: string;
  userLoggedIn: EventEmitter<any> = new EventEmitter();
  userLoggedOut: EventEmitter<any> = new EventEmitter();

  constructor(public config: Config, public http: Http) {
    console.log('Calling API constructor');
    this.endpoint = config.get('apiEndpoint');
    this.place = config.get('initialPlace');
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
    return this.get('/schools/rest/property/search/?place='+ this.place + '&expand=landlord,main_place,neighborhood&page=1&sort=-_reviews_number');
  }
}
