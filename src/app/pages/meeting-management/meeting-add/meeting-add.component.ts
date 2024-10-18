import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';

@Component({
  selector: 'app-meeting-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './meeting-add.component.html',
  styleUrl: './meeting-add.component.scss'
})
export class MeetingAddComponent {
  public meetingAddForm: any;
  user_id_for_edit: any;
  is_edit: boolean = false;


  constructor(private route: ActivatedRoute,
    private restApi: RestApiService,
    private noty: NotifyService,
    private router: Router
  ) {
    this.wingList();

    this.route.queryParamMap.subscribe((params: any) => {
      this.user_id_for_edit = params.params['id'];
    });

    if (this.user_id_for_edit != undefined) {
      this.is_edit = true;
      this.meetingDetails();
    }

  }


  ngOnInit(): void {

    this.meetingAddForm = new FormGroup({
      wing: new FormControl('', [Validators.required]),
      meet_time: new FormControl('', [Validators.required]),
      meet_date: new FormControl('', [Validators.required]),
    });
    this.meetingAddForm.patchValue({
      meet_time: '07:29'
    });

  }


  apiResponse: boolean = false;

  submitMeetingForm() {
    this.apiResponse = true;

    const formData = new FormData();
    formData.append('wing_id', this.meetingAddForm.get('wing').value);
    formData.append('meeting_date', this.meetingAddForm.get('meet_date').value);
    formData.append('meeting_time', this.meetingAddForm.get('meet_time').value);
    formData.append('meeting_id', this.user_id_for_edit ? this.user_id_for_edit.toString() : '');


    this.restApi.createMeetingApi(formData).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate(['/meeting-management']);
        this.noty.success(data.message);
      } else {
        this.noty.error(data.message);
      }
    });
  }



  meetingDetails() {
    this.restApi.meetingDetailsApi(this.user_id_for_edit).subscribe((response: any) => {
      if (response.status) {
        var _data = response.data;
        this.meetingAddForm.patchValue({
          wing: _data.wing_id,
          meet_date: _data.meeting_date,
          meet_time: _data.meeting_time,
        })
      }
    })
  }


  wingLists: any;
  wingList() {
    this.restApi.wingListApi().subscribe((res: any) => {
      if (res.status) {
        this.wingLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }

}