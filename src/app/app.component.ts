// NG2
import { Component, ViewContainerRef, OnInit } from '@angular/core';
// Vendor
import { NovoModalService, NovoModalRef } from 'novo-elements';
// App
import { PreferencesComponent } from './components/preferences/preferences.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
preferences: Object;

  constructor(private modalService: NovoModalService, private view: ViewContainerRef) {
    this.modalService.parentViewContainer = view;
  }

  ngOnInit() {
    if (!localStorage.getItem('AutomationPreferences')) {
      this.openPreferences();
    } else {
      this.preferences = JSON.parse(localStorage.getItem('AutomationPreferences'));
    }
  }

  openPreferences() {
    this.modalService.open(PreferencesComponent);
  }
}
