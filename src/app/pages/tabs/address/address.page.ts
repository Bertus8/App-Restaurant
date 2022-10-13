import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddressService } from 'src/app/services/address/address.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit, OnDestroy {

  isLoading: boolean;
  addresses: any[] = [];
  addressesSub: Subscription;
  model: any = {
    title: 'No Addresses added yet',
    icon: 'location-outline'
  };

  constructor(
    private global: GlobalService,
    private addressService: AddressService) { }

  ngOnInit() {
    this.addressesSub = this.addressService.addresses.subscribe(address => {
      console.log('addresses: ', address);
      if(address instanceof Array) {
        this.addresses = address;
      } else {
        if(address?.delete) {
          this.addresses = this.addresses.filter(x => x.id != address.id);
        } else if(address?.update) {
          const index = this.addresses.findIndex(x => x.id == address.id);
          this.addresses[index] = address;
        } else {
          this.addresses = this.addresses.concat(address);
        }
      }
    });
    this.getAddresses();
  }

  async getAddresses() {    
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.addressService.getAddresses();
      console.log(this.addresses);
      this.isLoading = false;
      this.global.hideLoader();
    }, 3000);
  }

  getIcon(title) {
    return this.global.getIcon(title);
  }

  editAddress(address) {

  }

  deleteAddress(address) {
    console.log('address: ', address);
    this.global.showAlert(
      'Are you sure you want to delete this address?',
      'Confirm',
      [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
            return;
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            this.global.showLoader();
            await this.addressService.deleteAddress(address);
            this.global.hideLoader();
          }
        }
      ]
    )
  }

  ngOnDestroy() {
    if(this.addressesSub) this.addressesSub.unsubscribe();
  }

}
