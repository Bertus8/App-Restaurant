import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Strings } from 'src/app/enum/strings';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  isLoading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private global: GlobalService) { }

  ngOnInit() {
  }

 /* async isLoggedIn() {
    try {
      this.global.showLoader();
      const val = await this.authService.getId();
      console.log(val);
      if(val) this.navigate('/tabs');
      this.global.hideLoader();
    } catch(e) {
      console.log(e);
      this.global.hideLoader();
    }
  } */

  onSubmit(form: NgForm) {
    if(!form.valid) return;
    this.register(form);
  }

  register(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    this.authService.register(form.value).then((data) => {
      console.log(data);
      this.navigate(data.type);
      this.isLoading = false;
      form.reset();
    })
    .catch(e => {
      console.log(e);
      this.isLoading = false;
      let msg: string = 'Could not sign you up, please try again.';
      if(e.code == 'auth/email-already-in-use') {
        msg = e.message;
      }
      this.global.showAlert(msg);
    });
  }

  navigate(type?) {
    let url = Strings.TABS;
    if(type == 'admin') url = Strings.ADMIN;
    this.router.navigateByUrl(url);
  }

}
