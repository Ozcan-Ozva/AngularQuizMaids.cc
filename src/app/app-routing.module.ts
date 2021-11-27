import { UserViewComponent } from './Components/user-view/user-view.component';
import { UserCardListComponent } from './Components/user-card-list/user-card-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './Components/user-list/user-list.component';

const routes: Routes = [
  {path: "*", redirectTo: "/user/card"},
  {path: "user/list", component: UserListComponent},
  {path: "user/card", component: UserCardListComponent},
  {path: 'user/view/:id', component: UserViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
