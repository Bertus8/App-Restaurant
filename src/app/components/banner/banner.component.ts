import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Keyboard, EffectFlip, Navigation, Pagination, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Pagination, EffectFlip, Keyboard]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterContentChecked {
  @Input() bannerImages: any[];
  config: SwiperOptions = {};
  constructor() { }

  ngOnInit() {}

  ngAfterContentChecked(): void {
      this.config = {
        slidesPerView: 1.1,
        spaceBetween: -300,
        navigation: true,
        pagination: { clickable: true },
        centeredSlides: true,
        effect: 'flip',
        keyboard: {enabled:true},
      }
  }

}
