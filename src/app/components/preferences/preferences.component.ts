// NG2
import { Component, OnInit } from '@angular/core';
// Vendor
import { SelectControl, PickerControl, NovoModalService, NovoModalRef, FormValidators, NovoToastService, FormUtils } from 'novo-elements';

import { TeamService } from '../../services/team/team.service';
import { ProjectService } from '../../services/project/project.service';
import { ResultService } from '../../services/result/result.service';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  form: any;
  teamControl: any;
  resultControl: any;
  projectControl: any;
  data: any = {};

  constructor(private modalRef: NovoModalRef, private formUtils: FormUtils, private teamService: TeamService,
              private projectService: ProjectService, private resultService: ResultService) { }

  ngOnInit() {
    const preferences = localStorage.getItem('AutomationPreferences');
    if (preferences) {
      this.data = JSON.parse(preferences);
    }
    this.setupForm();
  }

  setupForm() {
    const promises = [this.teamService.getOptions(), this.resultService.getOptions(), this.projectService.getOptions()];
    Promise.all(promises).then(options => {
      this.teamControl = new PickerControl({
          key: 'team',
          label: 'Team',
          readOnly: false,
          multiple: false,
          value: this.data.team,
          config: {
            options: options[0].data,
          }
      });
      this.resultControl = new PickerControl({
          key: 'result',
          label: 'Result',
          value: this.data.result,
          config: {
            options: options[1].data
          }
      });
      this.projectControl = new PickerControl({
          key: 'project',
          label: 'Project',
          value: this.data.project,
          config: {
            options: options[2].data
          }
      });
      this.form = this.formUtils.toFormGroup([this.teamControl, this.resultControl, this.projectControl]);
    });
  }

  save() {
    localStorage.setItem('AutomationPreferences', JSON.stringify(this.form.value));
    this.modalRef.close();
  }

  close() {
    this.modalRef.close();
  }
}
