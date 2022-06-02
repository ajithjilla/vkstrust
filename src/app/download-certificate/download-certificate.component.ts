import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';

import { AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';

export interface Certificate {
  aadhaarNumber: any,
  certificateUrl: any,
  eventId: number,
}

@Component({
  selector: 'app-download-certificate',
  templateUrl: './download-certificate.component.html',
  styleUrls: ['./download-certificate.component.scss']
})

export class DownloadCertificateComponent implements OnInit {

  //firebase variables
  itemsCollection!: AngularFirestoreCollection<Certificate>;
  ref!: AngularFireStorageReference;
  task!: any;
  uploadProgress!: any;
  downloadURL!: Observable<string>;
  uploadState!: Observable<string>;
  items: any;

  //UI items
  aadharNumber!: number;
  eventId: number = 1;
  event: any;
  generatedCaptcha: any;

  //image items
  image: any;
  imageSrc: any;
  url: any;
  alert: any;
  success = false;
  loading = false;
  captcha: any;

  constructor(private firestore: AngularFirestore) {
    this.itemsCollection = firestore.collection<Certificate>('certificate');
  }

  ngOnInit(): void {
    this.generateCAPTCHA();
  }

  getCertificate() {

    if (!this.aadharNumber) {
      this.alert = "*Please enter aadhar number";
      this.clearError();
      return;
    }

    if (this.aadharNumber.toString().length != 12) {
      this.alert = "*Please enter valid aadhar number";
      this.clearError();
      return;
    }
    if (this.generatedCaptcha != this.captcha) {
      this.alert = "Invalid Captcha....";
      this.clearError();
      return;
    }

    this.loading = true;

    // this.generatedCaptcha
    this.firestore.collection('certificate', ref => ref.where('aadhaarNumber', '==', this.aadharNumber)).valueChanges().subscribe(data => {
      this.loading = false;
      this.success = true;
      this.items = data;
      this.captcha = '';
      this.generateCAPTCHA();
    });
  }

  generateCAPTCHA() {
    this.generatedCaptcha = Math.random().toString(36).substring(7);
  }

  clearError() {
    setTimeout(() => {
      this.alert = "";
      this.success = false;
    }, 2000);
  }

}
