import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

import { ScannerServiceProvider } from '../../providers/scanner-service/scanner-service';
import { ListPage } from '../list/list';
/**
 * Generated class for the ScanProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-product',
  templateUrl: 'scan-product.html',
})
export class ScanProductPage implements ScannerDelegate {
  @ViewChild(Navbar) navBar: Navbar;
  public barcodes: Barcode[] = [];
  public continuousMode: boolean = false;
  public picker: BarcodePicker;
  public listBarcodes: Array<string> = new Array();

  @ViewChild(Content) private content: Content; 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public scanner: ScannerServiceProvider,
    ) {
  }

  public addToList(barcode) {
    this.listBarcodes.push(barcode);
  }

  public goTo() {
    this.scanner.cancel();
    this.navCtrl.push(ListPage, {
      data: this.listBarcodes
    });
  }

  public ionViewDidEnter(): void {
    this.scanner.contentTop = this.content.contentTop;
    this.scanner.delegate = this;
    this.scanner.start();
    this.navBar.backButtonClick = () => {
      ///here you can do wathever you want to replace the backbutton event
      this.scanner.cancel();
      this.navCtrl.pop();
    };
  }

  public didScan(session: ScanSession) {
    //if (!this.continuousMode) {
    //  session.pauseScanning();
    //}
    this.barcodes = session.newlyRecognizedCodes;
    this.addToList(session.newlyRecognizedCodes[0].data);
  }

  public resumeScanning() {
    this.scanner.resume();
    this.barcodes = [];
  }

  public toggleContinuousMode() {
    this.continuousMode = !this.continuousMode;
    this.scanner.resume();
  }

}
