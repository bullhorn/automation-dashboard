// NG2
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// App
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    component.listFilter = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Method: ngOnInit()', () => {
    it('should set default team and default results view if defaults exist', () => {
      expect(component.ngOnInit).toBeDefined();
      component.defaults = {
        team: 'Koala Tea',
        resultView: 'Failed'
      }
      component.ngOnInit();
      expect(component.listDefaults.teamFilter).toEqual('Koala Tea');
      expect(component.listDefaults.resultFilter).toEqual('Failed');
    });
  });

  describe('Method: onSidebarFilter(filter)', () => {
    it('should set listFilter equal to entered sidebar filter param', () => {
      let filter = {
        team: 'BBO',
        result: 'Skipped'
      }
      component.onSidebarFilter(filter);
      expect(component.listFilter).toEqual({team: 'BBO', result: 'Skipped'});
    });
  });
});
