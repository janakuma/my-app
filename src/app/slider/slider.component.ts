import { Component, OnInit } from '@angular/core';
import { sequence, animateChild, trigger, state, style, animate, transition, query, group, stagger } from '@angular/animations';

@Component({
  selector: 'app-slider',
  template: `
    <div style="margin: 20px 10px;">
      <button (click)="previous()" class="btn btn-default">Previous</button>
      <button (click)="next()" class="btn btn-default">Next</button>
      {{selectedIndex}}
    </div>

    <div [@slider]="selectedIndex" class="slider-container" style="margin: 20px 10px;">
        <div class="slide" *ngFor="let image of images"> <img [src]="image" /> </div>
    </div>

    <div *ngFor="let item of tests">{{item}} / {{item.length}}</div>
  `,
  /// styleUrls: ['./slider.component.scss'],
  styles: [`
    .slider-container { position:relative; height: 400px; width: 400px; overflow:hidden; border: 2px solid; }
    .slide { position:absolute; }
  `],

  animations: [
    trigger('slider', [
      transition(':increment', group([
        query(':enter', [
          style({left: '100%'}),
          animate('0.5s ease-out', style('*'))
        ]),

        query(':leave', [
          animate('0.5s ease-out', style({left: '-100%'}))
        ])
      ])),

      transition(':decrement', group([
        query(':enter', [
          style({left: '-100%'}),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({left: '100%'}))
        ])
      ])),
    ])
  ]
})
export class SliderComponent implements OnInit {

  private _images: string[] = [
    'https://via.placeholder.com/400x400?text=Hello',
    'https://via.placeholder.com/400x400?text=Angular',
    'https://via.placeholder.com/400x400?text=Animations'
  ];

  private _test: string[] = ['a', 'b', 'c'];

  selectedIndex = 0;

  constructor() { }
  ngOnInit() { }

  get images() {
    return [this._images[this.selectedIndex]];
  }

  get tests() {
    /// return [this._test[this.selectedIndex]];
    return [this._test];
  }

  /*
    get에 관한 API
    https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get

    : get을 사용하여 private의 배열을 리턴할수 있다.
  */


  previous() {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
  }

  next() {
    this.selectedIndex = Math.min(this.selectedIndex + 1, this._images.length - 1);
  }

}
