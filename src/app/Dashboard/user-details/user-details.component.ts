import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardService } from '../../Services/dashboard.service';
import { User, UserDetails } from '../../Models/Dashboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  // standalone: true,
  // imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy{

  constructor(private service: DashboardService,
              private route: ActivatedRoute, 
              private location: Location, 
              private router: Router){

  }

  userId!: number;
  page!: number;
  searchId!: number;

  user : User | undefined = undefined;

  getSubscription$!: Subscription;

  ngOnInit() {
    // get the id and the last page 
    // debugger;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.page = Number(this.route.snapshot.queryParamMap.get('page'));
    this.searchId = Number(this.route.snapshot.queryParamMap.get('searchId'));
    console.log(this.searchId, "this.searchId");
    

    this.getSubscription$ = this.service.getUserDetailsById(this.userId).subscribe(u => {
      this.user = u?.data;
    });
    
  }

  goBack() {
    // this.location.back();
    var page = this.page;
    var searchId = this.searchId
    // send the searchId and page back
    this.router.navigate(['/'], { queryParams: { page, searchId } });
  }

  // to prevent data leak
  ngOnDestroy(): void {
    this.getSubscription$.unsubscribe();
    
  }

}
