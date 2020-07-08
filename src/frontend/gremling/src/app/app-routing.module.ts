import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GremlingComponent } from './gremling/gremling.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'gremling', pathMatch: 'full'},
  { path: 'gremling', component: GremlingComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
