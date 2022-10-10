import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  isLoading: boolean;
  addresses: any[] =[];


  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses() {
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(() => {
      this.addresses = [      
        {address: "Fancy Bazaar, India", house: "2nd Floor", id: "7Kox63KlggTvV7ebRKar", landmark: "Fancy Bazar", lat: 26.1830738, lng: 91.74049769999999, title: "Fancy", user_id: "1"},
        {address: "Kanuat palace, India", house: "Ground Floor", id: "8Kox63KlggTvV7ebRKar", landmark: "Bazar", lat: 26.1830738, lng: 91.74049769999999, title: "Work", user_id: "1"},
        {address: "Kanuat palace, India", house: "Ground Floor", id: "8Kox63KlggTvV7ebRKar", landmark: "Bazar", lat: 26.1830738, lng: 91.74049769999999, title: "Home", user_id: "1"}
      ];
      this.isLoading = false;
      //this.global.successToast('Adresses retrieved successfully')
      //this.global.errorToast()
      //this.global.showAlert('Addresses retrieved', 'Addresses Page');
      this.global.hideLoader();
    }, 3000);
  }

  getIcon(title) {
    return this.global.getIcon(title);
    }
  

  editAddress(address) {

  }

  deleteAddress(address){

  }
}
