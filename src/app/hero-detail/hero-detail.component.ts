import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, group, stagger, keyframes, animation } from '@angular/animations';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],

  animations: [
    trigger('photoState', [
      state('move', style({
        transform: 'translateX(-100%)',
      })),
      state('enlarge', style({
        transform: 'scale(1.5)',
      })),
      state('spin', style({
        transform: 'rotateY(180deg) rotateZ(90deg)',
      })),
      transition('* => *', animate('500ms ease')),
    ]),

    trigger('listStagger', [
      transition('*<=>*', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('50ms',
          animate('1s ease-in-out', style({ opacity: '1' }))
        ), {optional: true}),

        query(':leave', style({opacity: 1}), {optional: true }),
        query(':leave', stagger('-50ms',
          animate('1s ease-in-out', style({ opacity: '0' }))
        ), { optional: true })
      ])
    ]),

    trigger('extend', [
      transition(':enter', [
          style({ opacity: 0 }),
          animate('0.5s ease-out', style({ opacity: 1 }))
       ]),
      transition(':leave', [
          style({ opacity: 1 }),
          animate('0.5s ease-out', style({ opacity: 0 }))
      ])
    ])
    ,

    trigger('extend1', [

      state('on', style({
        transform: 'translate(0,0)',
        fontSize: '10px',
        backgroundColor: 'black'
      })),

      state('off', style({
        transform: 'translate(100%,0)',
        fontSize: '20px',
        backgroundColor: 'gold'
      })),

      transition('off => on', animate('0.4s')),
      transition('on => off', animate('0.4s'))
    ]),

    trigger('extend2', [
      state('red', style({ background: 'red' }))
    ]),

    trigger('listStagger-1', [
      /* transition(':enter', [
        query('li', style({ transform: 'translateX(-100%)' }), { optional: true }),
        query('li',
          stagger('150ms', [
            animate('400ms  ease-in', style({ transform: 'translateX(0)' }))
          ]), { optional: true })
      ]),

      transition(':leave', [
        query('li', style({ transform: 'translateX(0%)' }), { optional: true }),
        query('li',
          stagger('-150ms', [
            animate('160ms ease-out', style({ transform: 'translateX(-100%)' }))
          ]), { optional: true })
      ]) */
      /// transition *를 사용하여 query를 선언하면 하위 엘리먼트에 적용
      transition('* => *', [
        query(':enter', style({ transform: 'translateX(-100%)' }), { optional: true }),
        query(':enter',
          stagger('150ms', [
            animate('160ms  ease-in', style({ transform: 'translateX(0)' }))
          ]), { optional: true }),
        query(':leave', style({ transform: 'translateX(0%)' }), { optional: true }),
        query(':leave',
          stagger('-150ms', [
            animate('160ms ease-out', style({ transform: 'translateX(-100%)' }))
          ]), { optional: true })
      ])
    ]),

    trigger('listStagger-1', [
      transition('* => *', [
        query(':enter', style({ transform: 'translateX(-100%)' }), { optional: true }),
        query(':enter',
          stagger('150ms', [
            animate('400ms  ease-in', style({ transform: 'translateX(0)' }))
          ]), { optional: true }),
        query(':leave', style({ transform: 'translateX(0%)' }), { optional: true }),
        query(':leave',
          stagger('-150ms', [
            animate('160ms ease-out', style({ transform: 'translateX(-100%)' }))
          ]), { optional: true })
      ])
    ]),

    /// transition *를 사용하여 query를 선언하면 하위 엘리먼트에 적용

    trigger('listStagger-2', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('400ms  ease-in', style({ transform: 'translateX(0%)' }))
      ]),

      transition(':leave', [
        animate('160ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),


    /*
    trigger
      transition
        query > style
        query > animate > style
    */

    /* trigger('listStagger', [
      transition('* <=> *', [
        query(':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave',
          [
            style({ opacity: 1, transform: 'translateY(0px)' }),
            stagger(
              '-50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 0, transform: 'translateY(-15px)' })
              )
            )
          ],
          { optional: true }
        ),
      ])
    ]) */
  ]
})

export class HeroDetailComponent implements OnInit  {
  listShow = false;
  listShow1 = false;
  listStagger_1 = false;
  rootStart;
  book = 'on';
  startState = 'red';
  select_item: any;
  constructor() { }

  position: string;
  photo = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'];

  listState = [
    {'value': 'val 01'},
    {'value': 'val 02'},
    {'value': 'val 03'},
    {'value': 'val 04'},
    {'value': 'val 05'},
    {'value': 'val 06'},
    {'value': 'val 07'},
    {'value': 'val 08'},
    {'value': 'val 09'},
    {'value': 'val 10'},
  ];

  ngOnInit() {
    this.rootStart = 'start';
    // setTimeout(() => this.listShow = true); //router 이벤트 제어
  }

  changePostion(newPostion: string) {
    this.position = newPostion;
  }

  selectVal(item) {
    this.select_item = item;
    console.log('item:', item);
  }


  addItem() {
    this.listState.push({'value': 'aa'});
  }

  removeItem() {
    this.listState.pop();
  }

  toggle() {
    /// this.book = book;
    this.book = this.book === 'on' ? 'off' : 'on';
  }
}
