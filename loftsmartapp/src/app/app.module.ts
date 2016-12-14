import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LoftsmartApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { PropertiesPage } from '../pages/properties/properties';
import { TabsPage } from '../pages/tabs/tabs';
import { LoftsmartAPI } from '../providers/api';

@NgModule({
  declarations: [
    LoftsmartApp,
    AboutPage,
    FavoritesPage,
    HomePage,
    LoginPage,
    MapPage,
    ProfilePage,
    PropertiesPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(LoftsmartApp, {
      tabsPlacement: 'bottom',
      apiEndpoint: 'https://aptu.co',
      // apiEndpoint: 'http://localhost:8002',
      baseMediaURL: '',
      initialPlace: '29d0dbd1-0d4a-4c3b-a9aa-dda53db91239'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoftsmartApp,
    AboutPage,
    FavoritesPage,
    HomePage,
    LoginPage,
    MapPage,
    ProfilePage,
    PropertiesPage,
    TabsPage
  ],
  providers: [LoftsmartAPI, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
