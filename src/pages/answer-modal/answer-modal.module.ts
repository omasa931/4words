import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnswerModalPage } from './answer-modal';

@NgModule({
  declarations: [
    AnswerModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AnswerModalPage),
  ],
})
export class AnswerModalPageModule {}
