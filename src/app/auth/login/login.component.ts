import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';
import { NgFor, NgIf } from '@angular/common';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
  loginForm:any;
  constructor(
    private restApi: RestApiService,
    private router: Router,
    private noty: NotifyService,
    private fb: FormBuilder,
    private storage:StorageService
    // private auth: AuthService,
  ) { }

  u_info: any;
  userRole!: string;
  responseData:any;
  ngOnInit(): void {
    this.loggedIn();

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(5),]),
    });

  }

  loggedIn(){
    const token = this.storage.get('token');
    if(token){
      this.router.navigate(['/']);
    }
  }
  
  apiResponse: boolean = false;

  public login() {
    if (this.loginForm.valid) {
      const formData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }
      this.apiResponse = true;
      this.restApi.login(formData).subscribe((response: any) => {
        if (response.status) {
          console.log(response.data.role)
          if(response.data.role == 1){
            this.storage.set('token',response.token);
            this.storage.set('user_details',JSON.stringify(response.data));
            this.router.navigate(['/']);
            this.noty.success(response.message);
            this.apiResponse = false;
          }
        }else{
          this.apiResponse = false;
          this.noty.error(response.message);
        }    
      });

    }
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
