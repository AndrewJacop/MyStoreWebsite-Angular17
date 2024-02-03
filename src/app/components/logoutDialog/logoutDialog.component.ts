import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/UserAuth.service';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logoutDialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
  ],
  templateUrl: './logoutDialog.component.html',
  styleUrls: ['./logoutDialog.component.css'],
})
export class LogoutDialogComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    public dialogRef: MatDialogRef<LogoutDialogComponent>
  ) {}

  ngOnInit() {}
  logMeOut(): void {
    this.userAuthService.sLogout();
  }
}
