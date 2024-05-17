import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginObj: any = {
      "EmailId": "",
      "Password": ""
  };

  showLogin: boolean = false;

  constructor(private http: HttpClient, private router: Router){}

  onLogin(){
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
    }

  showLoginForm(event: Event) {
    event.preventDefault();
    this.showLogin = true;
  }

}
