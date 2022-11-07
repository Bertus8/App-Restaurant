import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  profile: any = {};
  isLoading: boolean;
  orders: Order[] = [];
  ordersSub: Subscription;
  profileSub: Subscription;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private global: GlobalService,
    private profileService: ProfileService
    ) { }

  ngOnInit() {
    this.ordersSub = this.orderService.orders.subscribe(order => {
      console.log('order data: ', order);
      this.orders = order;
    }, e => {
      console.log(e);
    });
    this.profileSub = this.profileService.profile.subscribe(profile => {
      this.profile = profile;
      console.log(this.profile);
    });
    this.getData();
  }

  async getData() {
    this.isLoading = true;
    setTimeout(async() => {
      this.profile = {      
        name: 'Nikhil Agarwal',
        phone: '9109109100',
        email: 'technyks@gmail.com'  
      };
      await this.orderService.getOrders();
      this.isLoading = false;      
    }, 3000);
  }

  logout() {}

  async reorder(order: Order) {
    console.log(order);
    let data: any = await this.cartService.getCart();
    console.log('data: ', data);
    if(data?.value) {
      this.cartService.alertClearCart(null, null, null, order);
    } else {
      this.cartService.orderToCart(order);
    }
  }

  getHelp(order) {
    console.log(order);
  }

  async editProfile() {
    const options = {
      component: EditProfileComponent,
      componentProps: {
        profile: this.profile
      },
      cssClass: 'custom-modal',
      swipeToClose: true
    };
    const modal = await this.global.createModal(options);
  }

  ngOnDestroy() {
    if(this.ordersSub) this.ordersSub.unsubscribe();
    if(this.profileSub) this.profileSub.unsubscribe();
  }

}
