import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';
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

  searchId!: number;
  searchedUser = {} as User;
  private searchSubject = new Subject<number>();

  page!: number; // current page
  pageSize!: number; // how many users in the page
  totalUsers!: number; // total number of users

  noUserFound: boolean = false;

  constructor(private service: DashboardService, 
              private router: Router, 
              private route: ActivatedRoute) { 

                /* subscribe to searchSubject which will be called when the user write down a number
                  after 1 second of inputing the number */
                this.searchSubject.pipe(
                  debounceTime(1000),
                  switchMap(async (id) => this.searchUserById(id))).subscribe(() => {});
    
  }

  ngOnInit(): void {
    // get the last page number from user details component
    this.page = Number(this.route.snapshot.queryParamMap.get('page'));
    // in case did not come from the user details page set the default as the first page
    if(this.page == 0){
      this.page = 1;
    }
    this.getUsersByPage(this.page); 
    
  }

  searchUserById(id: number){
    
    this.service.getUserDetailsById(id).subscribe(user => {
      // if the user is found
      if(user){
        this.searchedUser = user.data;

        this.usersPerPage = [];
        this.usersPerPage.push(this.searchedUser);
        this.noUserFound = false;
      }
      // else show no data found
      else{
        this.usersPerPage = [];
        this.noUserFound = true;
      }
      
    });
  }

  onSearchChange(event: any): void {
    // when the user input a number
    if(event){
      this.searchSubject.next(event);
    }
    // when the input is empty get the users as default
    else{
      this.refreshUsers();
    }
   
  }
  
  // get the data by the pressed page
  getUsersByPage(page: number): void{
    this.getSubscription$ = this.service.getUsersByPage(this.page).subscribe(ul => {
      this.pageContent = ul;
      this.totalUsers = this.pageContent.total;
      this.pageSize = this.pageContent.per_page;
      this.usersPerPage = this.pageContent.data;
    });
  }

  refreshUsers(): void {
    this.getUsersByPage(this.page);
  }

  navigateToDetails(id: number): void{
    var page = this.page;
      /* here we are passing id for the user details
       and also the page number so when the user go back to the users list it will get the last page  */
      this.router.navigate(['/details', id], { queryParams: { page } });
    
  }
  

  // to prevent data leak
  ngOnDestroy(): void {
    this.getSubscription$.unsubscribe();
  }

}
