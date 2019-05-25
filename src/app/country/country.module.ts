import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AccordionModule } from 'ngx-accordion';

import { IonicModule } from '@ionic/angular';

import { CountryPage } from './country.page';

const routes: Routes = [
  {
    path: '',
    component: CountryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AccordionModule,
  ],
  declarations: [CountryPage]
})
export class CountryPageModule {}
