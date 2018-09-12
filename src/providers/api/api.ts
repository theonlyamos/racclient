import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../../shared/baseurl';

@Injectable()
export class ApiProvider {

  url : string = baseURL

  constructor(public http: HttpClient) {
    
  }

  getInfo(): Observable<any> {
    return this.http.get(this.url)
  }

}
