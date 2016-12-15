import { Component } from '@angular/core';

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
  tab1Root: any = PropertiesPage;
  tab2Root: any = MapPage;
  tab3Root: any = FavoritesPage;
  tab4Root: any = ProfilePage;

  constructor() {

  }
}
