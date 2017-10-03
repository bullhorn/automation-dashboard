// NG2
import { Component, OnInit, OnChanges, Input } from '@angular/core';
// APP
import { TestService } from '../../services/test/test.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() filter: any;
  tests: any;
  isLoading: Boolean = true;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.query(this.filter, true, 'name', 100, {name: 1}, {pastResults: 0}).subscribe(res => {
      this.tests = res.data;
      this.isLoading = false;
    });
  }

  ngOnChanges() {
    this.isLoading = true;
    this.testService.query(this.filter, true, 'name', 100, {name: 1}, {pastResults: 0}).subscribe(res => {
      this.tests = res.data;
      this.isLoading = false;
    });
  }

  delete(test) {
    this.testService.delete(test._id).subscribe(res => {
      this.ngOnChanges();
    });
  }

  markAsBug(test) {
    this.testService.update(test._id, {result: 'Bug'}).subscribe(res => {
      this.ngOnChanges();
    });
  }

  markAsFailed(test) {
    this.testService.update(test._id, {result: 'Failed'}).subscribe(res => {
      this.ngOnChanges();
    });
  }

  getIconForResult(test) {
    switch (test.result) {
        case 'Passed':
        case 'passed':
            return 'check';
        case 'Failed':
        case 'failed':
            return 'times';
        case 'Skipped':
            return 'republish';
        case 'Bug':
            return 'overview';
        case 'Pending':
            return 'flag';
        default:
            return 'question-o';
    }
  }
}
