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

  // User product schema
  product: userProducts = {
    title: '',
    image: '',
    content: ''
  };
  // check were the user is
  type: string; // fridge, freezer or pantry
  // set location of storage
  placeToStore; // fridge, freezer or pantry

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productListService: ProductListService) {
  }

  ionViewDidLoad() {
    this.type = this.navParams.get('type');
  }
  
  addProduct(product: userProducts) {
    if (this.type == "fridge") {
      this.productListService.addFridgeProduct(product).then(ref => {
        this.navCtrl.setRoot('HomePage');
      });
    } else if (this.type == "freezer") {
      this.productListService.addFreezerProduct(product).then(ref => {
        this.navCtrl.setRoot('HomePage');
      });
    } else if (this.type == "pantry") {
      this.productListService.addPantryProduct(product).then(ref => {
        this.navCtrl.setRoot('HomePage');
      });
    }
  }

}
