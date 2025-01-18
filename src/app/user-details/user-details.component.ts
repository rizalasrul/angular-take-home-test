import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  imports: [CommonModule]
})
export class UserDetailsComponent {
  user: any;
  isLoading = true; // Tambahkan loading state

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id') || '';
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false; // Selesai loading
      },
      error: () => {
        this.isLoading = false; // Selesai loading meski error
      }
    });
  }
}
