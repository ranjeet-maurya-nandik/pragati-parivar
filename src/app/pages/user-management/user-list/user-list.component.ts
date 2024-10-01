import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
interface userList {
  id: number,
  username: string,
  email: string,
  phone: number,
  role: number,
  city: string,
  address: string,
  state: string,
  postal_code: number,
  country: string,
  company_name: string
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  p: number = 1;
  ngOnInit(): void {
    this.userList();
  }
  userLists: userList[] = [];
  userList() {
    this.restApi.userListAPi().subscribe((res: any) => {
      if (res.status) {
        this.userLists = res.user_profiles;
      } else {
        this.noty.error(res.message);
      }
    })
  }

  deleteUser(id: number) {
    Swal.fire({
      text: 'Are you sure want to delete this user ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.restApi.deleteUserApi(id).subscribe((res: any) => {
          if (res.status) {
            this.userList();
            this.noty.success(res.message)
          } else {
            this.noty.error(res.message)
          }
        })
      }
    })

  }
}
