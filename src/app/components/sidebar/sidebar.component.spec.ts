// NG2
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
// Vendor
import { NovoModalService, FormUtils, ComponentUtils } from 'novo-elements';
// APP
import { SidebarComponent } from './sidebar.component';
import { TestService } from '../../services/test/test.service';
import { TeamService } from '../../services/team/team.service';
import { ProjectService } from '../../services/project/project.service';
import { ResultService } from '../../services/result/result.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ HttpModule ],
      providers: [ ActivatedRoute, NovoModalService, FormUtils, ComponentUtils, TeamService, ProjectService, ResultService, TestService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Method: ngOnInit()', () => {

  });

  describe('Method: initControls()', () => {
    
  });

  describe('Method: initOptions()', () => {
    
  });

  describe('Method: openPreferences()', () => {
    
  });

  fdescribe('Method: openTeams()', () => {
    it('should open modal with TeamPageComponent', () => {
      expect(component.openTeams).toBeDefined();
      spyOn(component.modalService, 'open').and.callFake(() => {
      });
      component.openTeams();
      expect(component.modalService.open).toHaveBeenCalledWith('TeamPageComponent');
    });
  });

  describe('Method: refreshList()', () => {
    
  });

  describe('Method: handleSidebarTotals()', () => {
    
  });
});
