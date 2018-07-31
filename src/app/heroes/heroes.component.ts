import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { sequence, animateChild, trigger, state, style, animate, transition, query, group, stagger } from '@angular/animations';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  animations: [
    trigger('staggerTab', [
      transition(':enter', [
        query('.tab li', style({ opacity: 0 })),
        query('.tab li', stagger(300, [
          style({ transform: 'translateY(100px)' }),
          animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(0px)', opacity: 1 })),
        ])),
      ]),
      transition(':leave', [
        query('.tab li', stagger(300, [
          style({ transform: 'translateY(0px)', opacity: 1 }),
          animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(100px)', opacity: 0 })),
        ])),
      ])
      /* transition(':enter', [
        query('.tab li', stagger(400, [
          style({ transform: 'translate(0,100px)' }),
          animate('1s ease-in-out', style({transform: 'translate(0,0)', opacity: 1}))
        ]), { optional: true })
      ]),

      transition(':leave', [
        query('.tab li', stagger('-400ms', [
          style({ transform: 'translate(0,100px)' }),
          animate('1s ease-in-out', style({ transform: 'translate(0,0)', opacity: 1 }))
        ]), { optional: true })
      ]) */
    ])
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@staggerTab]': ''}
})

export class HeroesComponent implements OnInit {
  heroes = HEROES;
  selectedHero: Hero;

  constructor(
    private heroService: HeroService
  ) {

  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
