import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySidebarComponent } from './summary-sidebar.component';

describe('SummarySidebarComponent', () => {
  let component: SummarySidebarComponent;
  let fixture: ComponentFixture<SummarySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
