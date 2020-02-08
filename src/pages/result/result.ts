


import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TopPage } from './../top/top';
import { SelectStagePage } from './../select-stage/select-stage';
import { PlayGame1Page } from './../play-game1/play-game1';
import { PlayGame2Page } from './../play-game2/play-game2';
import * as constant from '../../constant';
import { Storage } from '@ionic/storage';
import { stageresult } from './../../app/models/stageresult';
import { CommonLogicProvider } from './../../providers/common-logic/common-logic';

//@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  //選択したステージ
  currentStage: string
  //正解数
  correctNum: string
  //問題数
  totalNum: string
  //クリアタイム
  clearTime: string
  //storageのキー
  modeAndstg: string
  //実行結果
  sr: stageresult
  //モード
  mode: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commonlogic: CommonLogicProvider,
    private storage: Storage) {
    console.log("ResultPage.constructor");
    //現在のステージ
    this.currentStage = navParams.data.currentStage;
    //正解数
    this.correctNum = navParams.data.correctNum;
    //問題数
    this.totalNum = navParams.data.totalNum;
    //クリアタイム
    this.clearTime = navParams.data.clearTime;
    //ステージクリア情報
    this.sr = {
      clearTime: navParams.data.clearTime,
      hightScore: navParams.data.correctNum
    } 
    //モード
    this.mode = navParams.data.mode;
  }

  ionViewWillEnter() {
    console.log("ResultPage.ionViewWillEnter");
    var random = this.getRandom();
    //console.log("random:" + random);
    if  (random = 1) {
      this.commonlogic.showAddmobInterstitial(constant.ADMOB_INTERSTITIAL);
    }
  }
  ionViewDidEnter() {
    console.log("ResultPage.ionViewDidEnter");

    //ステージクリア情報を登録、更新するためのキー
    this.modeAndstg = this.mode + "_" +this.currentStage
    //console.log("this.modeAndstg:"+ this.modeAndstg);
    //strageから取得
    this.storage.get(this.modeAndstg)
      .then(result=>{
        // 値が取得できない場合
        if (result == null) {
          this.storage.set(this.modeAndstg, this.sr);

        // 値が取得できる場合
        }else{
          // console.log("this.correctNum" + this.correctNum);
          // console.log("result.hightScore" + result.hightScore);

          //今回正解数が過去の正解数より多い場合
          if(this.correctNum > result.hightScore) {
            this.storage.set(this.modeAndstg, this.sr);
          //過去の最高正解数と同じ場合
          }else if(this.correctNum = result.hightScore) {
            //今回クリアタイムが過去のクリアタイムより速い場合
            if(this.clearTime < result.clearTime) {
              this.storage.set(this.modeAndstg, this.sr);
            }
          }
        }
      })
      .catch(//err=>{
        //console.log("err");
      );
  }

  ionViewDidLoad() {
    console.log("result.ionViewDidLoad");
    this.commonlogic.showAddmobBanner(constant.ADMOB_BANNER_RESULT);
  }

  //トップへ戻る
  toTop() {
    console.log("ResultPage.toTop");
    this.navCtrl.push(TopPage);
  }

  //ステージ選択
  toSelectStage() {
    console.log("ResultPage.toSelectStage");
    this.navCtrl.push(SelectStagePage, {mode: this.mode});
  }
  //リトライ
  retry() {
    console.log("ResultPage.retry");
    this.navCtrl.pop();
  }

  //次のステージ
  toNext() {
    console.log("ResultPage.toNext");

    if (parseInt(this.currentStage) < constant.MAX_STAGE) {

      if (this.mode == constant.MODE1) {
        this.navCtrl.push(PlayGame1Page,
          {
            currentStage: this.currentStage + 1
          });
      } else {
        this.navCtrl.push(PlayGame2Page,
          {
            currentStage: this.currentStage + 1
          });
      }
    }
  }

  /**
   * モーダル（moreページ）の表示
   */
  showMoreModal() {
    console.log('SelectStagePage.showMoreModal()');
    this.commonlogic.showMoreModal()
  }

  //インタースティシャル制御用の乱数
  getRandom() {
    return Math.floor(Math.random() * Math.floor(constant.MATH_RANDOM_MAX));
  }
}
