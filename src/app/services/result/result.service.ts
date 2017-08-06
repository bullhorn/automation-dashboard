import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../../config/config';

@Injectable()
export class ResultService {

  constructor(private http: Http) { }

  getOptions() {
    const url = `${config.backendURL}result/options`;
    return this.http.get(url).map(res => res.json()).toPromise();
  }

}
