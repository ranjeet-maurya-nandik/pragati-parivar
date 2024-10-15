import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-wing',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-wing.component.html',
  styleUrl: './add-wing.component.scss'
})


export class AddWingComponent {
  public wingAddForm: any;
  user_id_for_edit: any;
  is_edit: boolean = false;


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
      this.wingDetails();
    }

  }


  ngOnInit(): void {
    this.wingAddForm = new FormGroup({
      wing: new FormControl('', [Validators.required]),
    });

  }


  apiResponse: boolean = false;

  submitWingForm() {
    this.apiResponse = true;

    const formData = new FormData();
    formData.append('wing_name', this.wingAddForm.get('wing').value);
    formData.append('id', this.user_id_for_edit ? this.user_id_for_edit.toString() : '');


    this.restApi.createWingApi(formData).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate(['/wing-management']);
        this.noty.success(data.message);
      } else {
        this.noty.error(data.message);
      }
    });
  }



  wingDetails() {
    this.restApi.wingDetailsApi(this.user_id_for_edit).subscribe((response: any) => {
      if (response.status) {
        var _data = response.data;
        this.wingAddForm.patchValue({
          wing: _data.wing_name,
        })
      }
    });
  }


}
