import { toPromise } from 'rxjs/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../../config/config';

@Injectable()
export class TeamService {

  constructor(private http: Http) { }

  query(where: Object) {
    const url = `${config.backendURL}team/query?where=${JSON.stringify(where)}`;
    return this.http.get(url).map(res => res.json());
  }

  update(id: Number, body: Object) {
    const url = `${config.backendURL}team/update/${id}`;
    return this.http.put(url, body).map(res => res.json());
  }

  getOptions() {
    const url = `${config.backendURL}team/options`;
    return this.http.get(url).map(res => res.json()).toPromise();
  }

  syncTeamTests(team: String) {
    const url = `${config.backendURL}test/updateTeamTests?team=${JSON.stringify(team)}`;
    return this.http.put(url, {}).map(res => res.json());
  }

  sendSlackReport(team: String) {
    const url = `${config.backendURL}team/slackUpdate/${team}`;
    return this.http.post(url, {}).map(res => res.json());
  }
}
