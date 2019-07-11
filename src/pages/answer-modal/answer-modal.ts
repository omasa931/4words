import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { BackdropProvider } from "../../providers/backdrop/backdrop";


@IonicPage()
@Component({
  selector: 'page-answer-modal',
  templateUrl: 'answer-modal.html',
})
export class AnswerModalPage {
  fourwords: string ='';
  reading: string ='';
  mean: string = '';
  okng: string = '';

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public backdrop: BackdropProvider) {

    this.fourwords = navParams.data.fourwords;
    this.reading = navParams.data.reading;
    this.mean = navParams.data.mean;
    this.okng = navParams.data.okng;

    this.backdrop.show(this.okng);
  }

  ionViewDidLoad() {
  }

  close() {
    this.backdrop.hide();
    this.viewCtrl.dismiss("1");
  }
}
