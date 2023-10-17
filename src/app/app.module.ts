import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { AppComponent } from './app.component';
import {
  CheckboxListInputComponent,
  HeaderBarComponent,
  HelpComponent,
  MultiInputComponent,
  RequestFormComponent,
  ResultsComponent,
  ValidationMessagesComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    RequestFormComponent,
    CheckboxListInputComponent,
    ValidationMessagesComponent,
    MultiInputComponent,
    HelpComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbPopoverModule,
    HttpClientModule,
    NgxUpperCaseDirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
