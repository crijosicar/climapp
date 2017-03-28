import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nav } from 'ionic-angular';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
	@ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController) {
    
  }

}
