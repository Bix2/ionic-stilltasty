import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { userProducts } from '../../model/product/userProducts.model';
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

  public listBarcodesParsed = Array();
  public listBarcodes: any;
  public date: string;
  public productList: any;
  public data;

  public pro: userProducts = {
    title: '',
    image: '',
    content: ''
  };



  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private productListService: ProductListService) {

    this.productList = this.productListService.getUserProducts()
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
      
      var productObject = {
        product: product,
        date: day + "-" + month + "-" + year
      }

      this.listBarcodesParsed.push(productObject);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  addProduct(title, image, content) {
      this.pro.title = title,
      this.pro.image = image,
      this.pro.content = content
      this.productListService.addProduct(this.pro);
      this.showToast("bottom");
  }

  showToast(position: string) {
    const toast = this.toastCtrl.create({
      message: 'Product has been added',
      position: position,
      showCloseButton: true,
      duration: 2000
    });

    toast.present();
  }

}
