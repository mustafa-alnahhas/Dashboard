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
  // list of users to show on page
  usersPerPage!: User[]

  getSubscription$!: Subscription;

  searchId!: number;
  searchedUser = {} as User;
  // subject to trigger on search id input change
  private searchSubject = new Subject<number>();

  page!: number; // current page
  pageSize!: number; // how many users in the page
  totalUsers!: number; // total number of users

  // will be used to show no data found in case the user is not exist
  noUserFound: boolean = false;

  constructor(private service: DashboardService, 
              private router: Router, 
              private route: ActivatedRoute) { 

                /* subscribe to searchSubject which will be called when the user write down a number
                  after 1.5 seconds of inputing the number */
                this.searchSubject.pipe(
                  debounceTime(1500),
                  switchMap(async (id) => this.searchUserById())).subscribe(() => {});
    
  }

  ngOnInit(): void {
    // get the last page number and the search id (in case it is exist) from user details component
    this.page = Number(this.route.snapshot.queryParamMap.get('page'));
     var searchId = Number(this.route.snapshot.queryParamMap.get('searchId'));
     // in case the searchId is exist
     if(searchId != 0){
      this.searchId = searchId
     }

    // in case did not come from the user details page set the default as the first page
    if(this.page == 0){
      this.page = 1;
    }

    // in case the user is coming back to searched user page
    if(this.searchId){
      this.searchUserById();
    }
    // else coming back from users result by page
    else{
      this.getUsersByPage(this.page); 
    }
  }

  searchUserById(){
    // if the searched id is null then get the data by page
    if(!this.searchId){
      this.getUsersByPage(this.page); 
      this.noUserFound = false;
    }
    else{
      this.service.getUserDetailsById(this.searchId).subscribe(user => {
        this.usersPerPage = [];
        ;
        // if the user is found
        if(user){
          this.searchedUser = user.data;
  
          this.usersPerPage.push(this.searchedUser);
          this.noUserFound = false;
        }
        // else show no data found
        else{

          this.noUserFound = true;
        }
        
      },
      error => {
        console.log(error,"error");
        
      });
    }
  
  }

  // will trigger the searchSubject subject on search id input change
  onSearchChange(event: any): void {
    this.searchSubject.next(event);
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
    var searchId = this.searchId;
      /* here we are passing id for the user details
       and also the page number so when the user go back
       to the users list it will get the last page 
       and also the searchId in case the user is coming from search user page */
      this.router.navigate(['/details', id], { queryParams: { page, searchId } });
    
  }
  

  // to prevent data leak
  ngOnDestroy(): void {
    // check if not null because if i am coming back from details page getSubscription will be null
    if(this.getSubscription$) this.getSubscription$.unsubscribe();
    
  }

}
