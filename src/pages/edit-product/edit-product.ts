import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { userProducts } from '../../model/product/userProducts.model';
import { ProductListService } from '../../services/product-list.service';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

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
    this.product = this.navParams.get('product');
  }

  updateProduct(product: userProducts) {
    this.productListService.updateProduct(product).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  removeProduct(product: userProducts) {
    this.productListService.removeProduct(product).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }
}
