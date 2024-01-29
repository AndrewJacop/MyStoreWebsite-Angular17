import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/UserAuth.service';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-logoutDialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
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
