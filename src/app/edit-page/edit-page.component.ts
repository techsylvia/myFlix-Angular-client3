import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<EditPageComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * allows user to edit their data, such as Username, password, email, and birthday
   */
  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000,
      });
      // Log out user if they update Username or Password to avoid errors
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Please login again with your new credentials',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    });
  }
}