import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController) {

  }
}
