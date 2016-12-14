import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';
import { MapPage } from '../map/map';
import { ProfilePage } from '../profile/profile';
import { PropertiesPage } from '../properties/properties';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = MapPage;
  tab3Root: any = FavoritesPage;
  tab4Root: any = PropertiesPage;
  tab5Root: any = ProfilePage;

  constructor() {

  }
}
