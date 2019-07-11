import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonLogicProvider } from './../../providers/common-logic/common-logic';
import * as constant from '../../constant';
import { SelectStagePage } from './../select-stage/select-stage';

/**
 * Generated class for the TopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top',
  templateUrl: 'top.html',
})
export class TopPage {

  isClear: boolean = true;
  isOutline: boolean = true;
  isLarge: boolean = true;
  myColor: string = 'primary';

  constructor(
    public navCtrl: NavController,
    private commonlogic: CommonLogicProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.commonlogic.showAddmobBanner(constant.ADMOB_BANNER);
  }

  toSelectStage() {
    console.log("ResultPage.toTop");
    this.navCtrl.push(SelectStagePage);
  }

  /**
   * モーダル（moreページ）の表示
   */
  showMoreModal() {
    console.log('SelectStagePage.showMoreModal()');
    this.commonlogic.showMoreModal()
  }
}
