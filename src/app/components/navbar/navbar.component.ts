import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../services/UserAuth.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logoutDialog/logoutDialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userAuthService.getLogState().subscribe((data) => {
      this.isLoggedIn = data;
    });
  }
  navToLogin() {
    this.router.navigate(['/home/login']);
  }

  openLogOutDialog(): void {
    this.dialog.open(LogoutDialogComponent, {
      width: '300px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }
}
