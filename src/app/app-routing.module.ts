import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MotionComponent } from './motion/motion.component';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent, data: { state: 'heroes'} },
  { path: 'heroDetail', component: HeroDetailComponent, data: { state: 'heroDetail' } },
  { path: 'motion', component: MotionComponent, data: { state: 'motion' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }