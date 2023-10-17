import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbPopoverModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { AppComponent } from './app.component';
import {
  BusyIndicatorComponent,
  CheckboxListInputComponent,
  HeaderBarComponent,
  HelpComponent,
  MultiInputComponent,
  RequestFormComponent,
  ResultsComponent,
  ToastContainerComponent,
  ValidationMessagesComponent
} from './components';
import { BusyIndicatorInterceptor } from './services/busy-indicator.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    RequestFormComponent,
    CheckboxListInputComponent,
    ValidationMessagesComponent,
    MultiInputComponent,
    HelpComponent,
    ResultsComponent,
    ToastContainerComponent,
    BusyIndicatorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbPopoverModule,
    HttpClientModule,
    NgxUpperCaseDirectiveModule,
    NgbToastModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BusyIndicatorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
