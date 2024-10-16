import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { BReportDetailsComponent } from './pages/business-reporting/b-report-details/b-report-details.component';
import { Routes } from '@angular/router';
import { MainContainerComponent } from './include/main-container/main-container.component';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './pages/user-management/user-list/user-list.component';
import { R2bComponent } from './pages/r2b/r2b.component';
import { ReferenceExchangedComponent } from './pages/reference-exchanged/reference-exchanged.component';
import { GiveAskComponent } from './pages/give-ask/give-ask.component';
import { BusinessReportingComponent } from './pages/business-reporting/business-reporting.component';
import { AddUserComponent } from './pages/user-management/add-user/add-user.component';
import { UserDetailsComponent } from './pages/user-management/user-details/user-details.component';
import { R2bDetailsComponent } from './pages/r2b/r2b-details/r2b-details.component';
import { ReferenceDetailsComponent } from './pages/reference-exchanged/reference-details/reference-details.component';
import { GiveAskDetailsComponent } from './pages/give-ask/give-ask-details/give-ask-details.component';
import { WingListComponent } from './pages/wing-management/wing-list/wing-list.component';
import { AddWingComponent } from './pages/wing-management/add-wing/add-wing.component';
import { ReportsComponent } from './pages/reports/reports/reports.component';
import { MeetingListComponent } from './pages/meeting-management/meeting-list/meeting-list.component';
import { MeetingAddComponent } from './pages/meeting-management/meeting-add/meeting-add.component';
import { R2bReportComponent } from './pages/reports/r2b-report/r2b-report.component';
import { R2bReportSummeryComponent } from './pages/reports/r2b-report-summery/r2b-report-summery.component';
import { ReferenceReportComponent } from './pages/reports/reference-report/reference-report.component';
import { ReferenceReportSummeryComponent } from './pages/reports/reference-report-summery/reference-report-summery.component';
import { BusinessReportSummeryComponent } from './pages/reports/business-report-summery/business-report-summery.component';
import { BusinessReportComponent } from './pages/reports/business-report/business-report.component';

export const routes: Routes = [
    {
        path: '', component: MainContainerComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },

            { path: 'user-management', component: UserListComponent },
            { path: 'add-user', component: AddUserComponent },
            { path: 'user-details', component: UserDetailsComponent },

            { path: 'meeting-management', component: MeetingListComponent },
            { path: 'add-meeting', component: MeetingAddComponent },

            { path: 'r2b', component: R2bComponent },
            { path: 'r2b-details', component: R2bDetailsComponent },

            { path: 'reference-exchanged', component: ReferenceExchangedComponent },
            { path: 'reference-exchanged-details', component: ReferenceDetailsComponent },

            { path: 'give-ask', component: GiveAskComponent },
            { path: 'give-ask-details', component: GiveAskDetailsComponent },

            { path: 'business-reporting', component: BusinessReportingComponent },
            { path: 'business-reporting-details', component: BReportDetailsComponent },

            { path: 'wing-management', component: WingListComponent },
            { path: 'add-wing', component: AddWingComponent },

            { path: 'reports', component: ReportsComponent },

            { path: 'r2b-report', component: R2bReportComponent },
            { path: 'r2b-report-summery', component: R2bReportSummeryComponent },

            { path: 'reference-report', component: ReferenceReportComponent },
            { path: 'reference-report-summery', component: ReferenceReportSummeryComponent },

            { path: 'business-report', component: BusinessReportComponent },
            { path: 'business-report-summery', component: BusinessReportSummeryComponent },



        ]
    },
    { path: 'login', component: LoginComponent }
];
