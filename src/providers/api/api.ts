import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../../shared/baseurl';

@Injectable()
export class ApiProvider {

  url : string = baseURL

  constructor(public http: HttpClient) {
    
  }

  home(): Observable<any> {
    return this.http.get(this.url)
  }

  openPath(dirUrl, name): Observable<any> {
    var options = {params: {name: name}}
    return this.http.get(this.url + dirUrl, options)
  }

  getInfo(info): Observable<any> {
    return this.http.get(this.url + info)
  }

  activateWindow(windowUrl, name): Observable<any> {
    return this.http.post(this.url + windowUrl, {window: name})
  }

  closeWindow(windowUrl, name): Observable<any> {
    var options = {params: {window: name}}
    return this.http.delete(this.url + windowUrl, options)
  }

}
