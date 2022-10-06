import { Component, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput;
  model: any = {
    icon: "search-outline",
    title: 'No Restaurants Record Found'
  }
  isLoading: boolean;
  query: any;
  allRestaurants: any[] = [
  {
    uid:'1A',
    cover: 'assets/imgs/1.jpg',
    name: 'Stayfit',
    short_name: 'stayfit',
    cuisines: [
      'Italian',
      'Mexican'
    ],
    rating: 5,
    delivery_time: 25,
    //distance: 2.5,
    price: 100
  },
  {
    uid:'2B',
    cover: 'assets/imgs/2.jpg',
    name: 'Stayfit1',
    short_name: 'stayfit1',
    cuisines: [
      'Italian',
      'Mexican'
    ],
    rating: 5,
    delivery_time: 25,
    //distance: 2.5,
    price: 100
  },
  {
    uid:'3C',
    cover: 'assets/imgs/3.jpg',
    name: 'Stayfit2',
    short_name: 'stayfit2',
    cuisines: [
      'Italian',
      'Mexican'
    ],
    rating: 5,
    delivery_time: 25,
    //distance: 2.5,
    price: 100
  },
];

  restaurants: any[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.sInput.setFocus();
    },500)
  }

  async onSearchChange(event) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.restaurants = [];
    if(this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async () =>{
        this.restaurants = await this.allRestaurants.filter((element: any) => {
          return element.short_name.includes(this.query)
        });
        console.log(this.restaurants);
        this.isLoading=false;
      },3000)
    }
  }

}
