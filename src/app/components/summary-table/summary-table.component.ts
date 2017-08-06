// NG2
import { Component, OnInit, OnChanges, Input } from '@angular/core';
// App
import { TestService } from '../../services/test/test.service';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss']
})
export class SummaryTableComponent implements OnInit, OnChanges {
  @Input() filter: any;
  table: any;
  tableConfig: any;
  columns: any;
  row: any;
  tableData: any;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.tableConfig = {
      filtering: false,
      sorting: false,
      ordering: false,
      resizing: false
    };

    this.columns = [
      {
          title: 'Result',
          name: 'result'
      },
      {
          title: 'Number of Tests',
          name: 'numTests'
      },
      {
          title: 'Percentage',
          name: 'percentage'
      }
    ];
    this.getTableData();
    this.setupTable();
  }

  ngOnChanges() {
    this.getTableData();
  }

  getTableData() {
    this.tableData = [
      {
        'result': 'Passed'
      },
      {
        'result': 'Failed'
      },
      {
        'result': 'Pending'
      },
      {
        'result': 'Bug'
      },
      {
        'result': 'Flake'
      },
      {
        'result': 'Inactive'
      }
    ];
    this.testService.resultTotals(this.filter.teamFilter).subscribe(res => {
      this.tableData = this.processTableData(res);
      this.setupTable();
    });
  }

  processTableData(resultData: any) {
    const table = this.tableData;
    let total = 0;
    table.forEach(res => {
      res['numTests'] = resultData[res.result];
      total += resultData[res.result];
    });
    table.forEach(res => {
      res['percentage'] = `${((resultData[res.result] / total) * 100).toFixed(2)}%`;
    });
    return table;
  }

  setupTable() {
    this.table = {
      columns: this.columns.slice(),
      rows: this.tableData.slice(),
      config: this.tableConfig
    };
  }
}
