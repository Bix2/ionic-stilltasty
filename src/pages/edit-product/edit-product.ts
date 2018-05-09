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

  // User product schema
  product: userProducts = {
    title: '',
    image: '',
    content: ''
  };
  // check were the user is
  type: string; // fridge, freezer or pantry

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productListService: ProductListService) {
  }

  ionViewDidLoad() {
    this.product = this.navParams.get('product');
    this.type = this.navParams.get('type');
  }

  // Update product based on location
  updateProduct(product: userProducts) {
    if (this.type == "fridge") {
      this.productListService.updateFridgeProduct(product).then(() => {
        this.navCtrl.setRoot('HomePage');
      });
    } else if (this.type == "freezer") {
      this.productListService.updateFreezerProduct(product).then(() => {
        this.navCtrl.setRoot('HomePage');
      });
    } else if (this.type == "pantry") {
      this.productListService.updatePantryProduct(product).then(() => {
        this.navCtrl.setRoot('HomePage');
      });
    }
  }

  // Delete product based on location
  removeProduct(product: userProducts) {
    if (this.type == "fridge") {
      this.productListService.removeFridgeProduct(product).then(() => {
        this.navCtrl.setRoot('HomePage');
      });
    } else if (this.type == "freezer") {
      this.productListService.removeFreezerProduct(product).then(() => {
        this.navCtrl.setRoot('HomePage');
      });
    } else if (this.type == "pantry") {
      this.productListService.removePantryProduct(product).then(() => {
        this.navCtrl.setRoot('HomePage');
      });
    }
  }
}
