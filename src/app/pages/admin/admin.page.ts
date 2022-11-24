import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Strings } from 'src/app/enum/strings';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private global:GlobalService,
   private authService: AuthService,
   private navCtrl: NavController ) { }

  ngOnInit() {
  }

  logout() {
    this.global.showLoader();
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot(Strings.LOGIN);
      this.global.hideLoader();
    })
    .catch(e=> {
      console.log(e);
      this.global.hideLoader();
      this.global.errorToast('Logout Failed!!');
    })
  }

}
