// NG2
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  tableFilter: any = {};

  constructor() { }

  ngOnInit() {
  }

  onSidebarFilter(filter) {
    this.tableFilter = filter;
  }
}
