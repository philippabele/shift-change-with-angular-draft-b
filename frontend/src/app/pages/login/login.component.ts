import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: any = {
      "EmailId": "",
      "Password": ""
  };

  showLogin: boolean = false;
  loginForm: any;

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'EmailId': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      'Password': new FormControl(null, Validators.required)
    });
  }

  onLogin(){
    if (this.loginForm.valid) { // Check if form is valid
      this.http.post('https://freeapi.gerasim.in/api/User/Login', this.loginObj).subscribe((res:any)=>{
        if(res.result){
          alert('login successfull');
          localStorage.setItem('loginToken', res.data.token);
          this.router.navigateByUrl('/home');
        }else{
          // Show error message
          alert(res.message);
        }
      })
    } else {
      // Show error message
      alert('Please enter a valid email and password.');
    }
  }

  showLoginForm(event: Event) {
    event.preventDefault();
    this.showLogin = true;
  }


}
