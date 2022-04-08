import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainScreenRoutingModule } from './main-screen-routing.module';
import { MainScreenComponent } from './main-screen.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainScreenRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [MainScreenComponent]
})
export class MainScreenModule { }
