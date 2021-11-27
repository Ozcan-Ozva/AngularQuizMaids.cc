import { User } from 'src/app/Model/user';
import { UserResponse } from '../../Model/user-response';
import { map } from 'rxjs/operators';
import { UserServiceService } from './../../Services/user-service.service';
import { Component, OnInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';

const CACHE_KEY= "httpUserCache";

@Component({
  selector: 'app-user-card-list',
  templateUrl: './user-card-list.component.html',
  styleUrls: ['./user-card-list.component.scss']
})
export class UserCardListComponent implements OnInit {

  page : number = 0;
  isLoading: boolean = true;
  filteredUser: User[] = [];
  public idToSearch: string = "";
  userResponse: UserResponse = {
    page: 0,
    per_page:0,
    total:0,
    total_page:0,
    data: [
      {id: 0, first_name:"", last_name:"", email:"", avatar:""}
    ] 
  };
  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.userResponse = JSON.parse(localStorage[CACHE_KEY] || []);
    console.log(this.userResponse);
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers(this.page).pipe(
      map((userResponse: UserResponse) => {
        this.userResponse = userResponse;
        localStorage[CACHE_KEY] = JSON.stringify(userResponse);
        this.isLoading= false;
        this.filteredUser = userResponse.data;
      })
    ).subscribe();
  }

  public onPageChange(pageNumber: PageEvent){
    this.page = pageNumber.pageIndex;
    console.log(this.page);
    this.getUsers();
  }

  public onSelectionChange(id: number) {
    console.log(id);
    this.router.navigate(['/user/view/'+id])
  }

  public searchOnId() {
    if(this.idToSearch != ""){
      console.log(this.idToSearch);
      this.filteredUser = this.userResponse.data.filter(
        userAfterFilter => {
          return userAfterFilter.id.toString().match(this.idToSearch);
        }
      )
    }else{
      this.filteredUser = this.userResponse.data;
    }
  }
}