import { Component, OnInit } from '@angular/core';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import { InputTemplateComponent } from './input-template/input-template.component';
@Component({
  selector: 'app-b-main',
  templateUrl: './b-main.component.html',
  styleUrls: ['./b-main.component.css']
})
export class BMainComponent implements OnInit {

  public task: string = '';
  public disableButton: boolean;
  public send: string = '';
  public readyTemplate: string = '';

  constructor() { }

  ngOnInit() {

  }

  public onNavigationItemClicked(item) {

    this.task = item;

  }

  public onSendName(name) {

    this.send = name;

  }

  public onSendReadyTemplate(template) {

    this.readyTemplate = template;

  }

  public onSaveTemplateClicked(boolean) {

    this.disableButton = boolean;

  }


}
