import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BHeaderComponent } from './b-header/b-header.component';
import { BMainComponent } from './b-main/b-main.component';
import { BFooterComponent } from './b-footer/b-footer.component';
import { NavigationButtonsComponent } from './b-main/navigation-buttons/navigation-buttons.component';
import { InputTemplateComponent } from './b-main/input-template/input-template.component';

@NgModule({
  declarations: [
    AppComponent,
    BHeaderComponent,
    BMainComponent,
    BFooterComponent,
    NavigationButtonsComponent,
    InputTemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
