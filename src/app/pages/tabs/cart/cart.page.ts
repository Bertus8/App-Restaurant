import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  
  urlCheck: any;
  url: any;
  model: any;
  deliveryCharge = 20;
  


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.checkUrl();
    this.getCartData();

  }
  getCart() {
    return Preferences.get({key: 'cart'});
  }
  async getCartData() {
    let data: any = await this.getCart();
    if(data?.value){
      this.model = await JSON.parse(data.value);
      console.log(this.model);
      this.calculate();
    }
    
  }
  async calculate() {
    let item = this.model.items.filter(x => x.quantity > 0);
    this.model.items = item;
    this.model.totalPrice = 0;
    this.model.totalItem = 0;
    this.model.deliveryCharge = 0;
    this.model.grandTotal = 0;
    item.forEach(element => {
      this.model.totalItem += element.quantity;
      this.model.totalPrice += (parseFloat(element.price) * parseFloat(element.quantity));
    });
    this.model.deliveryCharge = this.deliveryCharge
    this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
    this.model.grandTotal = (parseFloat(this.model.totalPrice) + parseFloat(this.model.deliveryCharge)).toFixed(2);
    if(this.model.totalItem == 0) {
      this.model.totalItem = 0;
      this.model.totalPrice = 0;
      this.model.grandTotal = 0;
      await this.clearCart();
      this.model = null;
    }
    console.log('cart: ', this.model);
  };
  

  clearCart(){
    return Preferences.remove({key: 'cart'});
  }

  getPreviousUrl() {
    return this.url.join('/');
  }

  quantityPlus(index) {
    try {
      console.log(this.model.items[index]);
      if(!this.model.items[index].quantity || this.model.items[index].quantity == 0) {
        this.model.items[index].quantity = 1;
        this.calculate();
      } else {
        this.model.items[index].quantity += 1; 
        this.calculate();
      }
    } catch(e) {
      console.log(e);
    }
  }

  quantityMinus(index) {
    if(this.model.items[index].quantity !== 0) {
      this.model.items[index].quantity -= 1; 
    } else {
      this.model.items[index].quantity = 0;
    }
    this.calculate();
  }

  checkUrl(){
    let url: any = (this.router.url).split('/');
    console.log('url: ', url);
    const spliced = url.splice(url.length - 2, 2); // /tabs/cart url.length - 1 - 1
    this.urlCheck = spliced[0];
    console.log('urlcheck: ', this.urlCheck);
    url.push(this.urlCheck);
    this.url = url;
    console.log(this.url);
  }

  changeAddress() {}

  makePayment() {
    console.log('make payment');
  }

}
