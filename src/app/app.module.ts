import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { DownloadCertificateComponent } from './download-certificate/download-certificate.component';
import { FormsModule } from "@angular/forms";
import { UploadCertificateComponent } from './upload-certificate/upload-certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadCertificateComponent,
    DownloadCertificateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
