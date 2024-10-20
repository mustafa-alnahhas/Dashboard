import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardService } from '../../Services/dashboard.service';
import { User, UserDetails } from '../../Models/Dashboard';

@Component({
  selector: 'app-user-details',
  // standalone: true,
  // imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  constructor(private service: DashboardService,
              private route: ActivatedRoute, 
              private location: Location, 
              private router: Router){

  }

  userId!: number;
  page!: number;

  user = {} as User;

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.page = Number(this.route.snapshot.queryParamMap.get('page'));

    this.service.getUserDetailsById(this.userId).subscribe(u => {
      this.user = u.data;
      console.log(this.user, "detailssss");
      
    });
    
  }

  goBack() {
    // this.location.back();
    var page = this.page;
    this.router.navigate(['/'], { queryParams: { page } });
  }

}
