<<<<<<< HEAD
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  constructor(public navCtrl: NavController) {
    
  }

}
=======
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
>>>>>>> d405f5f0deef5a662efd8fbc0822751364744c34
