import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  id: any;
  data: any = {};
  items: any[] = [];
  veg: boolean = false;
  isLoading:boolean;
  cartData: any = {};
  storeData: any = {};
  model = {
    icon: 'fast-food-outline',
    title: 'No Menu Available',
  };
  restaurants = [];
  categories: any[] = []; 
  allItems = [];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
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
      this.restaurants = this.api.restaurants1;
      this.categories = this.api.categories;
      this.allItems = this.api.allItems;
      this.getItems();
    });
  }

  getCart() {
    return Preferences.get({key: 'cart'});
  }

   getItems() {
    this.data = {};
    this.cartData = {};
    this.storeData = {};
    this.isLoading = true;
    setTimeout( () =>{ 
      let data: any = this.restaurants.filter(x => x.uid === this.id);
      this.data = data[0];
      this.categories = this.categories.filter(x => x.uid === this.id);
      this.items = this.allItems.filter(x => x.uid === this.id);
      console.log('restaurant: ', this.data);
      let cart: any = this.getCart();
      console.log(cart);
      if(cart?.value) {
        this.storeData = JSON.parse(cart.value);
        console.log(this.storeData);
        if(this.id == this.storeData.restaurant.uid && this.allItems.length > 0) {
          this.allItems.forEach((element:any) => {
            this.storeData.item.forEach(ele => {
              if(element.id != ele.id) return;
              element.quantity = ele.quantity;
            });
          });
        }
        this.cartData.totalItem = this.storeData.totalItem;
        this.cartData.totalPrice = this.storeData.totalPrice;
      }
      this.isLoading = false;
    },3000)
  }

  
  vegOnly(event) {
    console.log(event.detail.checked);
    this.items = [];
    if(event.detail.checked == true) this.items = this.allItems.filter(x => x.veg === true );
    else this.items = this.allItems;
    console.log('items: ', this.items);
  }

  quantityPlus( index) {
    try {
      console.log(this.items[index]);
      if(!this.items[index].quantity || this.items[index].quantity == 0) {
        this.items[index].quantity = 1;
        this.calculate();
      } else {
        this.items[index].quantity += 1; // this.items[index].quantity = this.items[index].quantity + 1
        this.calculate();
      }
    } catch(e) {
      console.log(e);
    }
  }

  quantityMinus( index) {
    if(this.items[index].quantity !== 0) {
      this.items[index].quantity -= 1; // this.items[index].quantity = this.items[index].quantity - 1
    } else {
      this.items[index].quantity = 0;
    }
    this.calculate();
  }

  calculate() {
    console.log(this.items);
    this.cartData.items = [];
    let item = this.items.filter(x => x.quantity > 0);
    console.log('added items: ', item);
    this.cartData.items = item;
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach(element => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += (parseFloat(element.price) * parseFloat(element.quantity));
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if(this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    console.log('cart: ', this.cartData);
  };

  async saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      console.log('cartData', this.cartData);
      await Preferences.set({
        key:'cart',
        value: JSON.stringify(this.cartData)
      })
    } catch (e) {
      console.log(e)
    }

  };

  viewCart() {
    if(this.cartData.items && this.cartData.items.length > 0) this.saveToCart();
    console.log('router url: ', this.router.url);
    this.router.navigate([this.router.url + '/cart'])
  }

}
