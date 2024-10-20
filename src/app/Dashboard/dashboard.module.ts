import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardInterfaceComponent } from './dashboard-interface/dashboard-interface.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [DashboardInterfaceComponent],
  imports: [
    CommonModule,
    // BrowserModule, 
    NgbModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
