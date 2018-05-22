import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { AddProductPage } from '../pages/add-product/add-product';

import { FIREBASE_CONFIG } from './firebase.credentials';
import { ProductListService } from '../services/product-list.service';
import { ScannerServiceProvider } from '../providers/scanner-service/scanner-service';
import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    MyApp,
    ListPage,
    EditProductPage,
    AddProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    EditProductPage,
    AddProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductListService,
    ScannerServiceProvider,
    LocalNotifications
  ]
})
export class AppModule { }
