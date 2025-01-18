import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  { path: '', component: UserListComponent }, // Route default
  { path: 'user/:id', component: UserDetailsComponent }, // Route for detail user
  { path: '**', redirectTo: '', pathMatch: 'full' } // Fallback route
];
