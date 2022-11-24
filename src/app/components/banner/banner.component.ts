import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from 'src/app/models/banner.model';
// import Swiper core and required modules
import SwiperCore, { Keyboard, Pagination, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Keyboard]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterContentChecked {

  @Input() bannerImages: Banner[];
  config: SwiperOptions = {};

  constructor(private router: Router) { }

  ngOnInit() {}

  ngAfterContentChecked(): void {
    this.config = {
      slidesPerView: 1.1,
      // navigation: true,
      pagination: { clickable: true },
      keyboard: { enabled: true }
      // centeredSlides: true
    };
  }

  goToRestaurant(data) {
    console.log(data);
    if(data?.res_id) {
      this.router.navigate(['/', 'tabs', 'restaurants', data.res_id]);
    }

  }


}
