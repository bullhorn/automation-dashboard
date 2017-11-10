import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NovoModalParams, NovoModalRef, StaticActivityTableService, NovoToastService, SimpleTablePaginationOptions } from 'novo-elements';

@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.scss']
})
export class TestHistoryComponent implements OnInit {
  public columns: NovoModalParams;
  public data: any;
  public activityService: StaticActivityTableService<any>;
  public displayedColumns: string[];
  public hasAction: boolean = false;
  public actionLabel: string;
  constructor(public params: NovoModalParams,
    private modalRef: NovoModalRef,
    public ref: ChangeDetectorRef,
    private toastService: NovoToastService,
  ) { }

  ngOnInit() {
    this.setupTable();
  }

  private setupTable(): void {
    this.columns = this.params['columns'];
    this.displayedColumns = this.params['displayColumns'];
    if (this.params['action']) {
      this.hasAction = true;
    }
    if (this.params['action']) {
      this.actionLabel = this.params['action']['label'];
    }
    this.activityService = new StaticActivityTableService<any>(this.params['data']);
    this.ref.markForCheck();
  }

}
