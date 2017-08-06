import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
@Input() defaults;
listDefaults: any = {};
listFilter: any = {};

  constructor() { }

  ngOnInit() {
    if (this.defaults) {
      this.listDefaults.teamFilter = this.defaults.team;
      this.listDefaults.resultFilter = this.defaults.resultView;
    }
  }

  onSidebarFilter(filter) {
    this.listFilter = filter;
  }

}
