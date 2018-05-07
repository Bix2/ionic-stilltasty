import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../model/product/product.model';
import { Products } from '../../model/product/products.model';
import { ProductListService } from '../../services/product-list.service';

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

  public listBarcodesParsed;
  public listBarcodes: any;
  public date: string;
  public productList: any;
  public data;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productListService: ProductListService) {

    this.productList = this.productListService.getProducts()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
      .subscribe(data => {
        this.data = data;
      });



    this.listBarcodes = navParams.get('data');
    var year;
    var month;
    var day;
    
    for (let index = 0; index < this.listBarcodes.length; index++) {
      if(this.listBarcodes[index].substr(0, 2) == "01") {
        var product = this.listBarcodes[index].substr(2, 14);
      }
      this.date = this.listBarcodes[index].split('15');
      year = this.date[1].substr(0, 2);
      month = this.date[1].substr(2, 2);
      day = this.date[1].substr(4, 2);
      
      this.listBarcodesParsed = [{
        product: product,
        date: day + "-" + month + "-" + year
      }];
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
