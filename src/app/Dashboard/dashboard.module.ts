import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardInterfaceComponent } from './dashboard-interface/dashboard-interface.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [DashboardInterfaceComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    // BrowserModule, 
    NgbModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
