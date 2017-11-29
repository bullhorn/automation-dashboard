import { NgModel } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import { TextAreaControl, SelectControl, TilesControl, FormUtils, NovoModalRef, TextBoxControl } from 'novo-elements';

import { TeamService } from '../../services/team/team.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
teamData: any;
controls: Array<any> = [];
teamDropdown: any;
dropdownValue: NgModel;
teamNames: any;
form: any;
dropdownForm: any;
dropdownControl: SelectControl;
syncTeam: Boolean;

  constructor(private teamService: TeamService, private formUtils: FormUtils, private modalRef: NovoModalRef) { }

  ngOnInit() {
    this.teamService.query({}).subscribe(res => {
      this.teamNames = res.data.map(data => data.name);
      this.teamData = res;
      this.dropdownControl = new SelectControl({
        label: 'Which Team?',
        key: 'dropdownValue',
        options: this.teamNames
      });

      this.dropdownForm = this.formUtils.toFormGroup([this.dropdownControl]);
      this.dropdownForm.valueChanges.subscribe(value => {
        this.dropdownSelected(value.dropdownValue);
      });
    });
  }

  private initControls(response) {
    this.controls = [];
    this.form = null;
    response.data.forEach(data => {
      this.controls.push(new TextBoxControl({
        key: 'name',
        value: data.name,
        label: 'Team Name'
      }));
      this.controls.push(new TextAreaControl({
        key: 'suites',
        value: data.suites ? data.suites : '',
        label: 'Suites',
        placeholder: 'Comma separated list of suites'
      }));
      this.controls.push(new TextBoxControl({
        key: 'slackChannel',
        value: data.slackChannel ? data.slackChannel : '',
        label: 'Slack Channel'
      }));
      this.controls.push(new TilesControl({
        key: 'syncTeam',
        value: true,
        options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
        label: 'Sync Team Data'
      }));
      this.form = this.formUtils.toFormGroup(this.controls);
    });
  }

  dropdownSelected(value) {
    this.teamService.query({name: value}).subscribe(data => {
      this.teamData = data;
      this.initControls(data);
    });
  }

  save() {
    if (this.form && this.form.value) {
      this.syncTeam = this.form.value.syncTeam;
      delete this.form.value.syncTeam;
      const body = this.form.value;
      if (typeof body.suites === 'string') {
        body.suites = body.suites.length ? body.suites.replace(/\s+/g, '').split(',') : [];
      }
      this.teamService.update(this.teamData.data[0].id, body).subscribe(res => {
        this.modalRef.close();
        if (this.syncTeam) {
          this.teamService.syncTeamTests(this.form.value.name).subscribe(data => {});
        }
      });
    } else {
      this.modalRef.close();
    }
  }

  close() {
    this.modalRef.close();
  }
}
