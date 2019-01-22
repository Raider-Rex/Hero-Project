import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** 
 * In this array is where you'll add routes.
 * Syntax: {path: '[path name]', component: '[component name]'}
 * Ex: {path: '', component: 'HomeComponent'} = This will assign the first page, defined as: '', to the Home Component's ".html" file.
 * (Note: There is no "Home Component")
 */
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
