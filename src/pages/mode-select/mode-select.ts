import { SelectStagePage } from './../select-stage/select-stage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-mode-select',
  templateUrl: 'mode-select.html',
})
export class ModeSelectPage {

  //モード
  playmode :string

  constructor(
    public navCtrl:NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private storage: Storage) {
  }

  ionViewDidEnter() {
    console.log('ModeSelectPage ionViewDidEnter');
    
    this.storage.get('mode').then(
      (val)=>{
        this.playmode = val;
        console.log("this.playmode:" +this.playmode);
    });
  }

  showSelectData() {
    console.log('ModeSelectPage showSelectData');
    this.storage.set('mode', this.playmode)

    this.navCtrl.push(SelectStagePage);
    this.viewCtrl.dismiss();
  }
}
