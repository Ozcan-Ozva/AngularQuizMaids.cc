import { map } from 'rxjs/operators';
import { User } from 'src/app/Model/user';
import { UserServiceService } from './../../Services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  isLoading: boolean = true;
  userId: number = 0;
  user: User = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService
    ) {
      route.params.subscribe(p => {
        this.userId = +p['id'];
        if(isNaN(this.userId) || this.userId < 0) {
          router.navigate(['/user/card']);
          return;
        }
      });
     }

  ngOnInit(): void {
    this.userService.getUser(this.userId).pipe(
      map((user: any) => {
        this.user = user.data;
        console.log(user);
        this.isLoading = false;
      })
    ).subscribe();
  }

  navigateToCardList(){
    this.router.navigate(['/user/card']);
  }

}
