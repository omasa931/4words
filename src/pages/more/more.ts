import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PrivacypolicyPage } from './../privacypolicy/privacypolicy';
import { Backdrop2Provider } from  '../../providers/backdrop2/backdrop2';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl :ViewController,
    public backdrop2: Backdrop2Provider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }
  close() {
    this.backdrop2.hide();
    this.viewCtrl.dismiss(null);
  }
  gotoPP() {
    this.navCtrl.push(PrivacypolicyPage)
  }

}
