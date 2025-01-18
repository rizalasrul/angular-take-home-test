import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

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
      phone: '123-456-7890',
      website: 'example.com',
      company: { name: 'Example Inc' }
    }));

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, CommonModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display loading message initially', () => {
    component.isLoading = true; // Set loading state
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.querySelector('p').textContent).toContain('Loading user details...');
  });

  it('should display user details after loading', () => {
    component.isLoading = false; // Set loading selesai
    component.user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'example.com',
      company: { name: 'Example Inc' }
    };
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.querySelector('h2').textContent).toContain('John Doe');
    expect(element.querySelector('p:nth-child(2)').textContent).toContain('john@example.com');
    expect(element.querySelector('p:nth-child(3)').textContent).toContain('123-456-7890');
    expect(element.querySelector('p:nth-child(4)').textContent).toContain('example.com');
    expect(element.querySelector('p:nth-child(5)').textContent).toContain('Example Inc');
  });
});
