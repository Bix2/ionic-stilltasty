import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanProductPage } from './scan-product';

@NgModule({
  declarations: [
    ScanProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanProductPage),
  ],
})
export class ScanProductPageModule {}
