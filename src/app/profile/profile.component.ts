import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditPageComponent } from '../edit-page/edit-page.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    }
    );          
} 
openEditPageDialog(): void {
  this.dialog.open(EditPageComponent, {
    width: '280px'
  });
}deletProfile(): void {
  if(confirm('Are you sure you want to delete your profile?')) {
    this.fetchApiData.deleteUser().subscribe((resp: any) => {
      localStorage.clear();
      this.snackBar.open('Profile deleted', 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}}  
