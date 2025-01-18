import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUserById']);
    mockUserService.getUserById.and.returnValue(of({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      website: 'example.com',
      company: { name: 'Example Inc' }
    }));

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, CommonModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display user details', () => {
    const element = fixture.nativeElement;
  
    expect(element.querySelector('h2').textContent).toContain('John Doe');
    expect(element.querySelector('p:nth-child(2)').textContent).toContain('john@example.com'); // Email
    expect(element.querySelector('p:nth-child(3)').textContent).toContain('example.com'); // Website
    expect(element.querySelector('p:nth-child(4)').textContent).toContain('Example Inc'); // Company name
  });
});
