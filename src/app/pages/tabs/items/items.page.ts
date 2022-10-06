import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  id: any;
  data: any = {};
  items: any[] = [];
  categories: any[] = [];

  restaurants = [
    {
      uid:'1.1',
      cover: 'assets/imgs/1.jpg',
      name: 'Stayfit',
      short_name: 'stayfit',
      adress: 'Karol Bagh, New Delhi',
      cuisines: [
        'Italian',
        'Mexican'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.5,
      price: 100
    },
    {
      uid:'2.1',
      cover: 'assets/imgs/2.jpg',
      name: 'Stayfit1',
      short_name: 'stayfit1',
      adress: 'Karol Bagh, New Delhi',
      cuisines: [
        'Italian',
        'Mexican'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.5,
      price: 100
    },
    {
      uid:'3.1',
      cover: 'assets/imgs/3.jpg',
      name: 'Stayfit2',
      short_name: 'stayfit2',
      adress: 'Karol Bagh, New Delhi',
      cuisines: [
        'Italian',
        'Mexican'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.5,
      price: 100
    },
  ]

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log('data:', paramMap);
      if (!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      console.log('id:', this.id);
    });
  }

  getItems() {
    this.data = {};
    let data: any = this.restaurants.filter(x => x.uid === this.id);
    this.data = data[0]
    console.log('restaurant: ', this.data);
  }

  getCuisine(cuisine) {
    return cuisine.join(', ');
  }

}
