import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit, OnChanges {
@Input() data: Object;
@Input() hidden: boolean;
formData: Array<any> = [];
total = 1;

  constructor() { }

  ngOnInit() {
    this.formData = [];
    for (const result in this.data) {
      if (this.data.hasOwnProperty(result)) {
        this.formData.push({
          count: this.data[result],
          label: result
        });
      }
    }
  }

  ngOnChanges() {
    this.formData = [];
    for (const result in this.data) {
      if (this.data.hasOwnProperty(result)) {
        this.formData.push({
          count: this.data[result],
          label: result
        });
      }
    }
    this.computeTotal();
  }

  computeTotal() {
    this.total = this.formData.map(item => item.count).reduce((last, current) => last + current, 0);
  }

}
