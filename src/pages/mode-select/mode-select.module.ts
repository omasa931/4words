import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeSelectPage } from './mode-select';

@NgModule({
  declarations: [
    ModeSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeSelectPage),
  ],
})
export class ModeSelectPageModule {}
