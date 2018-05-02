import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
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

  public listBarcodesParsed: Observable<Product[]>;
  public listBarcodes: any;
  public date: string;
  public productList: Observable<Product[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productListService: ProductListService) {

    this.productList = this.productListService.getProducts()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });

    this.listBarcodes = navParams.get('data');
    var year;
    var month;
    var day;
    var productName;

    for (let index = 0; index < this.listBarcodes.length; index++) {
      if(this.listBarcodes[index].substr(0, 2) == "01") {
        var product = this.listBarcodes[index].substr(2, 14);
      }
      this.date = this.listBarcodes[index].split('15');
      year = this.date[1].substr(0, 2);
      month = this.date[1].substr(2, 2);
      day = this.date[1].substr(4, 2);

      for (let i = 0; i < this.productList.length; i++) {
        if(product == this.productList[i].key) {
          productName = this.productList[i].name;
        }
      }

      this.listBarcodesParsed = ({
        product: productName,
        date: day + "-" + month + "-" + year
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
