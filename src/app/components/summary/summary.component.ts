// NG2
import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../services/team/team.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  tableFilter: any = {};

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

  onSidebarFilter(filter) {
    this.tableFilter = filter;
  }

  slackReport(team) {
    console.log(team);
    this.teamService.sendSlackReport(team).subscribe(res => {
      console.log(res);
    });
  }

}
