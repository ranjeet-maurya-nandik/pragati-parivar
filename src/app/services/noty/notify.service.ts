import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) {}

  info(msg: string, title: string = '', timeOut: number = 3 ) {
    this.toastr.info(msg, title,{ timeOut: timeOut * 1000 , tapToDismiss: true});
  }

  success(msg: string, title: string = '', timeOut: number = 3 ) {
    this.toastr.success(msg, title, {
      timeOut: timeOut * 1000 ,   tapToDismiss: true
    });
  }

  warning(msg: string, title: string = '', timeOut: number = 3 ) {
    this.toastr.warning(msg, title, { timeOut: timeOut * 1000 , tapToDismiss: true});
  }

  error(msg: string, title: string = '',  timeOut: number = 3 ) {
    this.toastr.error(msg, title,{ timeOut: timeOut * 1000 , tapToDismiss: true});
  }
}
