import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactsPageComponent } from './facts-page/facts-page.component';
import { FactDetailsComponent } from './fact-details/fact-details.component';

const routes: Routes = [
  { path: 'list', component: FactsPageComponent },
  { path: 'details/:index', component: FactDetailsComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
