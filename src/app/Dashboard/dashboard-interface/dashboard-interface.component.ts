import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../Services/dashboard.service';
import { PageRequestDto, User } from '../../Models/Dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-dashboard-interface',
  // standalone: true,
  // imports: [],
  templateUrl: './dashboard-interface.component.html',
  styleUrl: './dashboard-interface.component.scss'
})
export class DashboardInterfaceComponent implements OnInit, OnDestroy {

  pageContent = {} as PageRequestDto;
  usersPerPage!: User[]

  getSubscription$!: Subscription;

  page!: number; // default page is 1
  pageSize!: number; // how many users in the page
  totalUsers!: number; // total number of users

  constructor(private service: DashboardService, 
              private router: Router, 
              private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    // debugger;
    this.page = Number(this.route.snapshot.queryParamMap.get('page'));
    if(this.page == 0){
      this.page = 1;
    }
    this.getUsersByPage(this.page); 
    
  }
  
  getUsersByPage(page: number){
    this.getSubscription$ = this.service.getUsersByPage(this.page).subscribe(ul => {
      this.pageContent = ul;
      this.totalUsers = this.pageContent.total;
      this.pageSize = this.pageContent.per_page;
      this.usersPerPage = this.pageContent.data;
    });
  }

  refreshUsers() {
    this.getUsersByPage(this.page);
  }

  navigateToDetails(id: number){
    console.log(id);
    var page = this.page;
      this.router.navigate(['/details', id], { queryParams: { page } });
    
  }

  // to prevent data leak
  ngOnDestroy(): void {
    this.getSubscription$.unsubscribe();
  }

}
