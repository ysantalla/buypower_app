import {
  animate,
  style,
  transition,
  trigger,
  state
} from '@angular/animations';


export const fadeInOutTransition = trigger('fadeInOut', [
  state('void', style({
    opacity: 0
  })),
  transition('void <=> *', animate(1000)),
]);
