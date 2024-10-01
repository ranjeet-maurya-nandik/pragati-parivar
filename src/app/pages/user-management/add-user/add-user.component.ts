import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  public userAddForm: any;
  user_id_for_edit: any;
  is_edit: boolean = false;
  selectFile !: File | null;

  constructor(private route: ActivatedRoute,
    private restApi: RestApiService,
    private noty: NotifyService,
    private router: Router
  ) {

    this.route.queryParamMap.subscribe((params: any) => {
      this.user_id_for_edit = params.params['id'];
    });

    if (this.user_id_for_edit != undefined) {
      this.is_edit = true;
      this.prefillUserDetail();
    }

  }


  ngOnInit(): void {
    this.userAddForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postal_code: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(8)]),
    });

  }

  apiResponse: boolean = false;

  submitUserForm() {
    this.apiResponse = true;
    const password = this.userAddForm.get('password').value ?? '';
    if (!password) {
      this.noty.error('Password is required');
      return;
    }
    const formData = new FormData();
    formData.append('username', this.userAddForm.get('username').value);
    formData.append('email', this.userAddForm.get('email').value);
    formData.append('phone', this.userAddForm.get('phone').value ?? '');
    formData.append('city', this.userAddForm.get('city').value ?? '');
    formData.append('address', this.userAddForm.get('address').value ?? '');
    formData.append('state', this.userAddForm.get('state').value ?? '');
    formData.append('postal_code', this.userAddForm.get('postal_code').value ?? '');
    formData.append('country', this.userAddForm.get('country').value ?? '');
    formData.append('company_name', this.userAddForm.get('company_name').value ?? '');
    formData.append('password', password);
    formData.append('role', '6');


    this.restApi.createUserApi(formData).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate(['/']);
        this.noty.success(data.message);
      } else {
        this.noty.error(data.message);
      }
    });
  }



  prefillUserDetail() {
    this.restApi.userDetailsApi(this.user_id_for_edit).subscribe((response: any) => {
      if (response.status) {
        var _data = response.user_details;
        this.userAddForm.patchValue({
          username: _data.username,
          email: _data.email,
          phone: _data.phone,
          city: _data.city,
          address: _data.address,
          state: _data.state,
          postal_code: _data.postal_code,
          country: _data.country,
          company_name: _data.company_name,
          password: _data.password,
        })
      }
    });
  }


  updateUser(){
    const data = {
      username: this.userAddForm.get('username').value,
      email: this.userAddForm.get('email').value,
      phone: this.userAddForm.get('phone').value,
      city: this.userAddForm.get('city').value,
      address: this.userAddForm.get('address').value,
      state: this.userAddForm.get('state').value,
      postal_code: this.userAddForm.get('postal_code').value,
      country: this.userAddForm.get('country').value,
      company_name: this.userAddForm.get('company_name').value,
      password: this.userAddForm.get('password').value
    }
    this.restApi.userUpdateApi(this.user_id_for_edit,data).subscribe((res:any)=>{
      if(res.status){
        this.router.navigate(['/']);
        this.noty.success(res.message);
      }else{
        this.noty.error(res.message);
      }
    })
  }

  formSubmit(){
    if(this.is_edit){
      this.updateUser();
    }else{
      this.submitUserForm();
    }
  }
}
