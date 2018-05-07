import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { userProducts } from '../../model/product/userProducts.model';
import { ProductListService } from '../../services/product-list.service';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product: userProducts = {
    title: '',
    image: '',
    content: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productListService: ProductListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  addProduct(product: userProducts) {
    this.productListService.addProduct(product).then(ref => {
      this.navCtrl.setRoot('HomePage');
    })
  }

}
