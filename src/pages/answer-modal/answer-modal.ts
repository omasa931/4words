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
  mean1: string = ' ';
  mean2: string = ' ';
  mean3: string = ' ';
  
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public backdrop: BackdropProvider) {

    this.fourwords = navParams.data.fourwords;
    this.reading = navParams.data.reading;
    this.okng = navParams.data.okng;
    this.mean = navParams.data.mean;
    var meanval = navParams.data.mean;

    this.mean1 = meanval.slice(0, 12);
    this.mean2 = meanval.slice(12, 24);
    this.mean3 = meanval.slice(24);

    this.backdrop.show(this.okng);
  }

  ionViewDidLoad() {
  }

  close() {
    this.backdrop.hide();
    this.viewCtrl.dismiss("1");
  }
}
