import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainScreenRoutingModule } from './main-screen-routing.module';
import { MainScreenComponent } from './main-screen.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainScreenRoutingModule
  ],
  declarations: [MainScreenComponent]
})
export class MainScreenModule { }
