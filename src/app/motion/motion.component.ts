import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, group, stagger, animation, sequence } from '@angular/animations';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.scss'],
  animations: [
    trigger('profileAnimation', [
      /* state('move', style({ transform: 'translate(400px,0)'})),
      transition('* => *',
        animate('0.4s ease-in', )
      ) */
    ]),

    trigger('eventAnimation', [
      state('true', style({ transform: 'scale(1.2)' })),
      state('false', style({ transform: 'scale(1)' })),
      transition('*<=>*', animate('1s')),
    ]),

    trigger('showMotion', [

        transition(':enter', group([
          query('aside', style({ transform: 'translateY(100px)', opacity: 0 })),
          query('aside', stagger('300ms', [
            animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(0px)', opacity: 1 })),
          ])),

          query('.staggerList li', style({ transform: 'translateY(100px)', opacity: 0 })),
          query('.staggerList li', stagger('0.1s', [
            animate('0.8s cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(0px)', opacity: 1 })),
          ])),
        ])),

        transition(':leave', group([
          query('aside', stagger('300ms', [
            style({ transform: 'translateY(0px)', opacity: 1 }),
            animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(100px)', opacity: 0 })),
          ]), { optional: true }),

          query('.staggerList li', stagger('-0.1s', [
            style({ transform: 'translateY(0px)', opacity: 1 }),
            animate('0.8s cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(100px)', opacity: 0 })),
          ]), { optional: true })
        ])),
    ]),

    trigger('stateMotion', [
      transition(':enter', [
        style({transform: 'translate(-100%,0)'}),
        animate('0.4s', style({ transform: 'translate(0,0)' }))
      ]),

      transition(':leave', [
        animate('0.4s', style({transform: 'translate(100%,0)'}))
      ])
    ]),

    trigger('toggleBox', [

      state('min', style({height: 0})),
      state('max', style({ height: '*' })),

      transition('min <=> max', [
        animate('0.4s')
      ]),

    ])
  ],
  host: {
    '[@showMotion]': '',
  }
})
export class MotionComponent implements OnInit {

  state: String = null;
  isEventClick: Boolean = false;
  isEventClick1: Boolean = false;
  toggleState = 'min';


  constructor() { }

  ngOnInit() {}

  eventClick() {
    this.isEventClick = !this.isEventClick;
  }

  eventClick1() {
    this.isEventClick1 = !this.isEventClick1;
  }

  stateChange() {
    this.state = this.state === 'move' ? null : 'move';
  }

  listEvent() {


  }

  start(event) {
    console.log('start from:', event.toState);
    console.log('start to:', event.fromState);
    console.log('start actual state:', this.isEventClick); // 애니메이션의 트리거 상태 값을 넣어준다.
  }

  done(event) {
    console.log('done:', event.toState);
    console.log('done:', event.totalTime);
  }

  toggleBox() {
    this.toggleState = this.toggleState === 'min' ? 'max' : 'min' ;
    console.log(this.toggleState);
  }
}
