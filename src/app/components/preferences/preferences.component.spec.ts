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
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: any) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Method: ngOnInit()', () => {
    it('should set preferences based on local storage', () => {
      expect(component.ngOnInit).toBeDefined();
      let preferences = { team: 'Stanley', result: 'Failed', project: '' };
      localStorage.setItem('AutomationPreferences', JSON.stringify(preferences));
      component.ngOnInit();
      expect(component.data).toEqual(preferences);
    });

    it('should call setupForm()', () => {
      spyOn(component, 'setupForm').and.callThrough();
      component.ngOnInit();
      expect(component.setupForm).toHaveBeenCalled();
    });
  });

  describe('Method: setupForm()', () => {
    // TODO: More tests in this method
    it('should set this.form', () => {
      expect(component.setupForm).toBeDefined();
    });
  });

  describe('Method: save()', () => {
    it('should save supplied parameters to local storage', () => {
      expect(component.save).toBeDefined();
      let preferences = {
        team: 'Legion',
        result: 'Pass',
        project: 'BBO'
      };
      component.save();
      localStorage.setItem('AutomationPreferences', JSON.stringify(preferences));
      expect(localStorage.getItem('AutomationPreferences')).toEqual(JSON.stringify(preferences));
    });

    it('should close modal', () => {
      expect(component.close).toBeDefined();
      spyOn(component.modalRef, 'close').and.callFake(() => {
      });
      component.save();
      expect(component.modalRef.close).toHaveBeenCalled();
    });
  });

  describe('close()', () => {
    it('should close modal', () => {
      expect(component.close).toBeDefined();
      spyOn(component.modalRef, 'close').and.callFake(() => {
      });
      component.close();
      expect(component.modalRef.close).toHaveBeenCalled();
    });
  });
});
