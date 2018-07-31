import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { sequence, animateChild, trigger, state, style, animate,  transition, query, group, stagger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('* => *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),

        // query('.extend', style({ opacity: 0 }), { optional: true }),

        sequence([
          query(':leave', animateChild(), { optional: true }),
          group([
            query(':leave', [
              style({ transform: 'translateX(0%)' }),
              animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
            ], { optional: true }),

            query(':enter', [
              style({ transform: 'translateX(100%)' }),
              animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true })
          ]),
          query(':enter', animateChild(), { optional: true }),
        ])

      ])
    ])
  ]
})


export class AppComponent implements OnInit {
  title = 'app';

  constructor() { }

  ngOnInit() {

  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.state
  }
}
