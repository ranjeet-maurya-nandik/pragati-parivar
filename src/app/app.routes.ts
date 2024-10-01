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

export const routes: Routes = [
    {path:'',component:MainContainerComponent,
        children:[
            {path:'',redirectTo:'user-management', pathMatch:'full'},
            {path:'user-management',component:UserListComponent},
            {path:'add-user',component:AddUserComponent},
            {path:'user-details',component:UserDetailsComponent},
            {path:'r2b',component:R2bComponent},
            {path:'reference-excahanged',component:ReferenceExchangedComponent},
            {path:'give-ask',component:GiveAskComponent},
            {path:'business-reporting',component:BusinessReportingComponent},
        ]
    },
    {path:'login',component:LoginComponent}
];
