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
    this.wingList();

    this.userAddForm = new FormGroup({
      wing: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      password: new FormControl('', [Validators.minLength(8)]),
      user_photo: new FormControl('', []),

      company_name: new FormControl('', [Validators.required]),
      company_logo: new FormControl('', []),
      company_website: new FormControl('', []),
      category: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      officeMap: new FormControl('', [this.urlValidator]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postal_code: new FormControl('', [Validators.required,Validators.pattern('^[0-9]*$')]),
      country: new FormControl('', [Validators.required]),
    });

  } 
 urlValidator(control: any) {
    const urlPattern = /^(https?:\/\/)?(www\.)?(google\.(com|co\.[a-z]{2,3})\/maps|openstreetmap\.org\/)(.+)$/;
    if (!control.value.match(urlPattern)) {
      return { invalidUrl: true };
    }
    return null;
  }

  apiResponse: boolean = false;

  submitUserForm() {
    this.apiResponse = true;
    const password = this.userAddForm.get('password').value ?? '';
    if (!password && !this.is_edit) {
      this.noty.error('Password is required');
      return;
    }
    const formData = new FormData();
    formData.append('wing_id', this.userAddForm.get('wing').value);
    formData.append('name', this.userAddForm.get('name').value);
    formData.append('email', this.userAddForm.get('email').value);
    formData.append('phone', this.userAddForm.get('phone').value ?? '');
    formData.append('password', password);
    formData.append('profile_pic', this.userPicFile ?? '');

    formData.append('company_name', this.userAddForm.get('company_name').value ?? '');
    formData.append('company_website', this.userAddForm.get('company_website').value ?? '');
    formData.append('category', this.userAddForm.get('category').value ?? '');
    formData.append('company_logo', this.websiteLogoFile ?? '');
    formData.append('address', this.userAddForm.get('address').value ?? '');
    formData.append('map_url', this.userAddForm.get('officeMap').value ?? '');
    formData.append('city', this.userAddForm.get('city').value ?? '');
    formData.append('state', this.userAddForm.get('state').value ?? '');
    formData.append('postal_code', this.userAddForm.get('postal_code').value ?? '');
    formData.append('country', this.userAddForm.get('country').value ?? '');
    formData.append('id', this.user_id_for_edit ? this.user_id_for_edit.toString() : '' );

 
    this.restApi.createUserApi(formData).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate(['/user-management']);
        this.noty.success(data.message);
      } else {
        this.noty.error(data.message);
      }
    });
  }

  websiteLogoFile: any ;

  websiteLogo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.websiteLogoFile = input.files[0];
    }
  }

  userPicFile: any;

  userPic(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.userPicFile = input.files[0];
    }
  }

  prefillUserDetail() {
    this.restApi.userDetailsApi(this.user_id_for_edit).subscribe((response: any) => {
      if (response.status) {
        var _data = response.data;
        this.userAddForm.patchValue({
          name: _data.name,
          email: _data.email,
          phone: _data.phone,
          city: _data.city,
          address: _data.address,
          state: _data.state,
          postal_code: _data.postal_code,
          country: _data.country,
          company_name: _data.company_name,
          password: _data.password,
          wing:_data.wing_id,
          // user_photo:_data.profile_pic,
          // company_logo:_data.company_logo,
          company_website:_data.company_website,
          category:_data.category	,
          officeMap:_data.map_url,
        })
      }
    });
  }

wingLists:any;
  wingList(){
    this.restApi.wingListApi().subscribe((res:any)=>{
      if(res.status){
          this.wingLists = res.data; 
      }else{
        this.noty.error(res.message);
      }
    })
  }



}
