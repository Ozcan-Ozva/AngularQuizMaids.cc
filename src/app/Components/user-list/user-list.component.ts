import { map } from 'rxjs/operators';
import { UserResponse } from '../../Model/user-response';
import { UserServiceService } from './../../Services/user-service.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/Model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email'];
  public dataSource!: MatTableDataSource<User>;
  page : number = 0;
  public userResponse: UserResponse = {
    page: 0,
    per_page:0,
    total:0,
    total_page:0,
    data: [
      {id: 0, first_name:"", last_name:"", email:"", avatar:""}
    ] 
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserServiceService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(){
    this.getUser();
  }

  private getUser() {
    this.userService.getUsers(this.page).pipe(
      map((userResponse: UserResponse) => {
        this.dataSource = new MatTableDataSource(userResponse.data);
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.userResponse = userResponse;
      })
    ).subscribe();
  }

  public onPageChange(pageNumber: PageEvent){
    this.page = pageNumber.pageIndex;
    console.log(this.page);
    this.getUser();
  }

}