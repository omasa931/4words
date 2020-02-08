import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , PopoverController} from 'ionic-angular';
import { ResultPage } from './../result/result';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { CommonLogicProvider } from './../../providers/common-logic/common-logic';

import { qa1 } from "../../app/models/qa1";
import * as constant from '../../constant';


@IonicPage()
@Component({
  selector: 'page-play-game1',
  templateUrl: 'play-game1.html',
})
export class PlayGame1Page {

  //qa1Data :qa1
  qa1Data: {
    fourwords: string,
    question: string,
    reading: string,
    select1: string,
    select2: string,
    select3: string,
    select4: string,
    right: string,
    mean: string
  } = {
    fourwords: '',    
    question: '',
    reading: '',
    select1: '',
    select2: '',
    select3: '',
    select4: '',
    right: '',
    mean: ''
  }
  //現在の問題番号
  qano :number = 0
  //現在の問題番号(表示用)
  qanoView :number = 1
  //問題数
  qaAll :number = 0;
  //正解数
  correct :number = 0
  //不正解数
  incorrect :number = 0
  qa1Datas :qa1[]
  //選択したステージ
  currentStage: string
  //開始時間
  startTime: Date
  //終了時間
  endTime: Date
  //クリアタイム
  clearTime: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private commonlogic: CommonLogicProvider,
    private http: HttpClient,
    public popoverCtrl: PopoverController) {
    console.log("PlayGame1Page.constructor")
    //現在のステージ
    this.currentStage = navParams.data.currentStage;

    //開始時間
    this.startTime = new Date();
  }

  ionViewDidLoad() {
    console.log("PlayGame1Page.ionViewDidLoad");
    this.commonlogic.showAddmobBanner(constant.ADMOB_BANNER_PLAY1);
  }

  ionViewWillEnter() {
    console.log("PlayGame1Page.ionViewWillEnter");
  }

  ionViewDidEnter() {
    console.log("PlayGame1Page.ionViewDidEnter");
    //resultから遷移してきたときのために各パラメータを初期化
    this.qano = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.qanoView = 1;

    this.getJsonData().subscribe(
      result => {
        this.qa1Datas = result;
        //問題数
        this.qaAll = this.qa1Datas.length;

        //問題の並べ替え
        let r1, r2 :number
        let temp: qa1
        //配列の入れ替えを30回繰り返す
        for ( let count = 0; count < 30; count++ ) {
          //0～問題数の乱数(整数)を2つ生成
          r1 = Math.floor( Math.random() * this.qaAll )
          r2 = Math.floor( Math.random() * this.qaAll )
          //1つめの値を取得
          temp = this.qa1Datas[r1];
          //1つめと2つ目を入れ替える
          this.qa1Datas[r1] = this.qa1Datas[r2];
          this.qa1Datas[r2] = temp;
        }
        this.setViewData(0);
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
      }
    );
  }

  setViewData(prm_qano: number) {
    console.log("PlayGame1Page.setViewData");
    this.qa1Data.fourwords = this.qa1Datas[prm_qano].fourwords;
    this.qa1Data.question = this.qa1Datas[prm_qano].question;
    this.qa1Data.reading = this.qa1Datas[prm_qano].reading;
    this.qa1Data.select1 = this.qa1Datas[prm_qano].select1;
    this.qa1Data.select2 = this.qa1Datas[prm_qano].select2;
    this.qa1Data.select3 = this.qa1Datas[prm_qano].select3;
    this.qa1Data.select4 = this.qa1Datas[prm_qano].select4;
    this.qa1Data.right = this.qa1Datas[prm_qano].right;
    this.qa1Data.mean = this.qa1Datas[prm_qano].mean;
  }

  seletAnswer(selectno: string){
    console.log("PlayGame1Page.seletAnswer")
    let okng = "OK"
    if (selectno == this.qa1Data.right) {
      //console.log("正解");
      this.correct++;
    } else {
      //console.log("はずれ");
      this.incorrect++;
      okng = "NG"
    }

    // 回答モーダルを表示
    this.showAnswerModal(okng);

    //
    if (this.qano < this.qa1Datas.length - 1) {
      this.qano = this.qano + 1
    }
  }

  getJsonData() {
    console.log("PlayGame1Page.getJsonData");
    //return this.http.get<qa1[]>('/assets/data/stage1.json');
    console.log(this.currentStage + '.json');
    return this.http.get<qa1[]>('/assets/data/stage' + this.currentStage + '.json');
  }

  showAnswerModal(okng :string) {
    console.log("PlayGame1Page.showAnswerModal");
    const modal = this.modalCtrl.create("AnswerModalPage",
     {fourwords: this.qa1Data.fourwords,
      reading: this.qa1Data.reading,
      mean: this.qa1Data.mean,
      okng: okng
     });
    // モーダルダイアログが消えたとき
    modal.onDidDismiss(res => {
      if (res !== null) {
        console.log("正解数：" + this.correct+ "  不正解数："+this.incorrect +"　問題数：" +this.qa1Datas.length)
        // 全問終了なら結果ページへ
        if (this.correct + this.incorrect == this.qa1Datas.length) {
          //終了時間
          this.endTime = new Date();
          var mSec = this.endTime.getTime() - this.startTime.getTime();
          this.clearTime = (mSec / 1000).toFixed(1);
          console.log(this.clearTime);

          this.navCtrl.push(ResultPage,
            {
              currentStage: this.currentStage,
              correctNum: this.correct,
              totalNum: this.qa1Datas.length,
              clearTime: this.clearTime,
              mode: constant.MODE1
            });
        // 次の問題
        } else {
          this.qanoView = this.qanoView + 1
          this.setViewData(this.qano)
        }
      }
    });
    modal.present();
  }

//  presentPopover (event) {
//     const popover = this.popoverCtrl.create(ModeSelectPage, {},  {cssClass: 'custom-popover'});
//     popover.present({
//       ev: event
//     });
//   }

  /**
   * モーダル（moreページ）の表示
   */
  showMoreModal() {
    console.log('SelectStagePage.showMoreModal()');
    this.commonlogic.showMoreModal()
  }
}
