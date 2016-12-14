import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LoftsmartApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { PropertiesPage } from '../pages/properties/properties';
import { TabsPage } from '../pages/tabs/tabs';
import { LoftsmartAPI } from '../providers/api';

@NgModule({
  declarations: [
    LoftsmartApp,
    AboutPage,
    ContactPage,
    HomePage,
    PropertiesPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(LoftsmartApp, {
      tabsPlacement: 'bottom',
      apiEndpoint: 'https://loftsmart.com',
      // apiEndpoint: 'http://localhost:8002',
      baseMediaURL: 'https://loftsmart-prod-media.s3.amazonaws.com/'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoftsmartApp,
    AboutPage,
    ContactPage,
    HomePage,
    PropertiesPage,
    TabsPage
  ],
  providers: [LoftsmartAPI, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
