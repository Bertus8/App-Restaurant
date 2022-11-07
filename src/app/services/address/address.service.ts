import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchLocationComponent } from 'src/app/components/search-location/search-location.component';
import { Address } from 'src/app/models/address.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  radius = 10; // in KM

  private _addresses = new BehaviorSubject<Address[]>([]);
  private _addressChange = new BehaviorSubject<Address>(null);

  get addresses() {
    return this._addresses.asObservable();
  }
  
  get addressChange() {
    return this._addressChange.asObservable();
  }

  constructor(private api: ApiService) { }

  getAddresses(limit?) {
    try {
      //user id
      let allAddress: Address[] = this.api.addresses;
      console.log(allAddress);
      if(limit){
        let address: Address[] = [];
        let length = limit;
        if(allAddress.length < limit) length = allAddress.length;
        for (let i = 0; i < length; i++) {
        address.push(allAddress[i]);
        }
        allAddress = address;
      }
      this._addresses.next(allAddress);
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }

  addAddress(param) {
    param.id = 'address1';
    param.user_id = 'user1';
    const currentAddresses = this._addresses.value;
    const data = new Address(
      param.id,
      param.user_id,
      param.title,
      param.address,
      param.landmark,
      param.house,
      param.lat,
      param.lng
    );
    currentAddresses.push(data);
    this._addresses.next(currentAddresses);
    this._addressChange.next(data);
  }

  updateAddress(id, param) {
    param.id = id;
    let currentAddresses = this._addresses.value;
    const index = currentAddresses.findIndex(x => x.id == id);
    const data = new Address(
      id,
      param.user_id,
      param.title,
      param.address,
      param.landmark,
      param.house,
      param.lat,
      param.lng
    );
    currentAddresses[index] = data;
    this._addresses.next(currentAddresses);
    this._addressChange.next(data);
  }

  deleteAddress(param) {
    let currentAddresses = this._addresses.value;
    currentAddresses = currentAddresses.filter(x => x.id != param.id);
    this._addresses.next(currentAddresses);
  }

  changeAddress(address){
    this._addressChange.next(address);
  }

  async checkExistAddress(location?) {
    console.log('check exist address: ', location);
    let loc: Address = location;
    const address = await this.api.addresses.find(x => x.lat === location.lat && x.lng === location.lng );
    if(address) loc = address;
    console.log(loc)
    this.changeAddress(loc);
    /*if (address) {
      this.changeAddress(address);
      return true;
    } else return null;
    if(!address)*/
  }


}
