import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  profile: any = {};
  isLoading: boolean;
  orders:any[] = [];
  ordersSub: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.ordersSub = this.orderService.orders.subscribe(order => {
      console.log('order data: ', order);
      if(order instanceof Array){
        this.orders = order;
      }
    }, e => {
      console.log(e);
    });
      this.getData();
  }

  
  async getData() {
    this.isLoading = true;
    setTimeout(async ()=>{
      
      this.profile = {
        name: 'Alberto S',
        phone: '910910925',
        email:'technyks@hotmail.com'
      };
      await this.orderService.getOrders();
      this.isLoading = false;
    },3000);
  }
  
  logOut() {}
  
  reorder(order) {
    console.log(order)
  }
  
  getHelp(order) {
    console.log(order)
  }

  ngOnDestroy(): void {
    if(this.ordersSub) this.ordersSub.unsubscribe();
  }
  
}
