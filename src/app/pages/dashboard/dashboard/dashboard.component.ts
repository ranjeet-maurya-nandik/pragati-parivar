import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

interface Type {
  r2b_frequency: number,
  ref_ex_frequency: number,
  br_frequency: number,
  wing_id: number,
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxPaginationModule, RouterLink, ChartModule, CarouselModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  p: number = 0;
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  r2b!: Chart;
  reference_exchanged!: Chart;
  data = {
    r2b_frequency: 1,
    ref_ex_frequency: 1,
    br_frequency: 1,
    wing_id: 1
  }
  ngOnInit(): void {
    this.dashboard(this.data);
    this.wingList()
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


  dashboard_data: any = [];
  businessData: any = [];
  referenceCategory: any = [];
  referenceNumber: any = [];
  r2bCategory: any = [];
  r2bNumber: any = [];
  response: boolean = true;

  dashboard(data: any) {
    this.response = false;
    this.restApi.dashboardApi(data).subscribe((res: any) => {
      if (res.status) {
        this.dashboard_data = res.data;
        // business reporting //
        this.businessData = Object.keys(this.dashboard_data.br_counts).map(month => ({
          month: month,
          count: this.dashboard_data.br_counts[month]
        }));

        // reference reporting //
        this.referenceCategory = Object.keys(this.dashboard_data.ref_ex_data);
        this.referenceNumber = Object.values(this.dashboard_data.ref_ex_data);

        // r2b reporting //
        this.r2bCategory = Object.keys(this.dashboard_data.r2b_data);
        this.r2bNumber = Object.values(this.dashboard_data.r2b_data);


        this.charts();
        this.response = true;
        this.checkFilterValues()
      } else {
        this.response = true;
        this.noty.error(res.message);
      }
    })
  }
  // type 1 business reporting
  // type 2 Reference reporting
  // type 3 R2B reporting
  // type 4 Wing Meeting

  Filter(type: number, id: number) {
    if (type == 1) {
      this.data.br_frequency = id;
    } else if (type == 2) {
      this.data.ref_ex_frequency = id;
    } else if (type == 3) {
      this.data.r2b_frequency = id;
    } else if (type == 4) {
      this.data.wing_id = id;
    } else if (type == 5) {
      this.data.wing_id = id;
      this.data.r2b_frequency = id;
      this.data.ref_ex_frequency = id;
      this.data.br_frequency = id;
    }

    this.dashboard(this.data);
  }
  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    nav: false,
    margin: 15,
    center: true,
    items: 6,
    responsive: {
      1400: {
        items: 6
      },
      1500: {
        items: 7
      }
    },
  }

  charts() {
    this.r2b = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'R2B',
        align: 'left'
      },
      xAxis: {
        categories: this.r2bCategory,
        lineColor: '#9A9A9A',
        crosshair: true,
        accessibility: {
          description: 'Month'
        }
      },
      yAxis: {
        crosshair: true,
        lineWidth: 1,
        lineColor: '#9A9A9A',
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<b>R2B</b><br/>',
        pointFormat: ' {point.y}'
      },
      plotOptions: {
        column: {
          borderRadius: '50%',
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: '',
          color: '#3D85BA',
          data: this.r2bNumber
        },
      ] as Highcharts.SeriesOptionsType[]
    });

    this.reference_exchanged = new Chart({
      chart: {
        type: 'spline',
      },
      title: {
        text: 'Reference Exchange',
        align: 'left'
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },

      xAxis: {
        categories: this.referenceCategory,
        accessibility: {
          description: 'Months of the year'
        }
      },
      yAxis: {
        lineWidth: 1,
        title: {
          text: ''
        },
      },
      plotOptions: {
        spline: {
          marker: {
            fillColor: '#fff',
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: ' {point.y}'
      },
      series: [{
        name: 'Reference',
        color: '#DF492B',
        data: this.referenceNumber

      }] as Highcharts.SeriesOptionsType[]
    });
  }
  updateFilter: boolean = false;
  checkFilterValues() {
    if (this.data.r2b_frequency !== 1 || this.data.ref_ex_frequency !== 1 || this.data.br_frequency !== 1 || this.data.wing_id !== 1) {
      this.updateFilter = true;
    } else {
      this.updateFilter = false;
    }
    console.log(this.updateFilter);
  }

}
