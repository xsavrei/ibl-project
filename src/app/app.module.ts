import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CheckboxListInputComponent, HeaderBarComponent, RequestFormComponent } from './components';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { MultiInputComponent } from './components/multi-input/multi-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    RequestFormComponent,
    CheckboxListInputComponent,
    ValidationMessagesComponent,
    MultiInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
