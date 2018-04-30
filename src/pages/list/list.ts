import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  public listBarcodesParsed: Array<string> = new Array();
  public listBarcodes: any;
  public date: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listBarcodes = navParams.get('data');
    var year;
    var month;
    var day;
    for (let index = 0; index < this.listBarcodes.length; index++) {
      if(this.listBarcodes[index].substr(0, 2) == "01") {
        var product = this.listBarcodes[index].substr(2, 14);
        this.listBarcodesParsed.push(product);
      }
      this.date = this.listBarcodes[index].split('15');
      year = this.date[1].substr(0, 2);
      month = this.date[1].substr(2, 2);
      day = this.date[1].substr(4, 2);
      this.listBarcodesParsed.push(day + "-" + month + "-" + year);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
