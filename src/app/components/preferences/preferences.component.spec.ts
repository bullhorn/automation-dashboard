// NG2
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
// Vendor
import { NovoModalRef, FormUtils } from 'novo-elements';
// APP
import { PreferencesComponent } from './preferences.component';
import { TeamService } from '../../services/team/team.service';
import { ProjectService } from '../../services/project/project.service';
import { ResultService } from '../../services/result/result.service';

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ HttpModule ],
      providers: [ NovoModalRef, FormUtils, TeamService, ProjectService, ResultService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    component.form = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
