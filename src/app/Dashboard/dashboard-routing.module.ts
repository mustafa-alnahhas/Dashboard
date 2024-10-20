import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardInterfaceComponent } from './dashboard-interface/dashboard-interface.component';

const routes: Routes = [
  {
      path: '', component: DashboardInterfaceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
