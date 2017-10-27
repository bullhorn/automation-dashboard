// NG2
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Vendor
import { FormUtils, TextAreaControl, SelectControl, NovoModalService } from 'novo-elements';
// App
import { TestService } from '../../services/test/test.service';
import { TeamService } from '../../services/team/team.service';
import { PreferencesComponent } from '../preferences/preferences.component';

@Component({
  selector: 'app-summary-sidebar',
  templateUrl: './summary-sidebar.component.html',
  styleUrls: ['./summary-sidebar.component.scss']
})
export class SummarySidebarComponent implements OnInit {
  @Input() defaults: any;
  @Output() filter: EventEmitter<any> = new EventEmitter();
  controls = [];
  summarySidebarForm: any;
  teamOptions: any;

  constructor(private testService: TestService, private formUtils: FormUtils, private modalService: NovoModalService, private teamService: TeamService) { }

  ngOnInit() {
    this.initOptions();
    this.controls = this.initControls();
    this.summarySidebarForm = this.formUtils.toFormGroup(this.controls);

    console.log(this.summarySidebarForm.valueChanges);

    this.summarySidebarForm.valueChanges.debounceTime(500).subscribe(value => {
      this.filter.emit(value);
    });
    this.filter.emit(this.summarySidebarForm.value);
  }

  private initControls(): Array<any> {
    const returnControls = [];
    returnControls.push(new SelectControl({
      key: 'teamFilter',
      options: this.teamOptions,
      placeholder: 'Team Filter'
    }));
    return returnControls;
  }

  private initOptions(): void {
    this.teamOptions = [
      {
        label: 'All Teams',
        value: ''
      },
      {
        label: 'Legion',
        value: 'Legion'
      },
      {
        label: 'Koala Tea',
        value: 'Koala Tea'
      },
      {
        label: 'OOOF',
        value: 'OOOF'
      },
      {
        label: 'Stanley',
        value: 'Stanley'
      },
      {
        label: 'Shark Party',
        value: 'Shark Party'
      },
      {
        label: 'TBD',
        value: 'TBD'
      }
    ];
  }

  slackReport(team) {
    this.teamService.sendSlackReport(team).subscribe(res => {
    });
  }
}
