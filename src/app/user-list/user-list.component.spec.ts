import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockUserService.getUsers.and.returnValue(of([
      { id: 1, name: 'John Doe', email: 'john@example.com', website: 'example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', website: 'example.org' }
    ]));

    await TestBed.configureTestingModule({
      imports: [UserListComponent, RouterTestingModule, CommonModule], // Masukkan UserListComponent ke imports
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display users in the table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('John Doe');
    expect(rows[1].textContent).toContain('Jane Doe');
  });

  it('should show "Loading users..." when no users are available', () => {
    mockUserService.getUsers.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    const loadingText = fixture.nativeElement.querySelector('.loading-text');
    expect(loadingText.textContent).toContain('Loading users...');
  });
});
