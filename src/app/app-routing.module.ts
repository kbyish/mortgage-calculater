import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MorgageCalculatorComponent } from './morgage-calculator/morgage-calculator.component';
import { NotFoundComponent } from './not-found/not-found.component';
//const routes: Routes = [];

const routes: Routes = [
  
  {path : '', component : MorgageCalculatorComponent},
  {path : 'home', component : HomeComponent},
  {path : 'morgage-calculator', component : MorgageCalculatorComponent},
  {path: '**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
